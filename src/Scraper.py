import bs4 as bs
import requests
import threading


class Scraper:

    def __init__(self):
        self.start_scraper()

    def start_scraper(self):
        URL = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments'
        page = requests.get(URL)

        if page.status_code == 200:
            # print("page loaded")
            soup = bs.BeautifulSoup(page.content, 'html.parser')

            main_table = soup.find("table", id="mainTable")
            # print("Check if connected to VPN: \n")
            # print(main_table)
            subject_links = []

            if main_table:

                a_elements = main_table.find_all("a", href=True)
                # print(a_elements)
                for a in a_elements:
                    # print(f'{a.text}: {a["href"]}\n')
                    if a.text[:4] == "GEOG":
                        subject_links.append('https://courses.students.ubc.ca' + a["href"])

            # TODO: Implement multi-threading

            # print(subject_links)
            subject_threads = []
            for link in subject_links:
                # print("CHECK0")
                thread = threading.Thread(target=self.scrape_subject, args=(link,))
                thread.start()
                subject_threads.append(thread)
        else:
            print("fail")

    def scrape_subject(self, link):
        # print("TEST0")
        subject_page = requests.get(link)
        subject_soup = bs.BeautifulSoup(subject_page.content, 'html.parser')
        subject_main_table = subject_soup.find("table", id="mainTable")
        class_links = []
        if subject_main_table:
            subject_a_elements = subject_main_table.find_all("a", href=True)
            for a in subject_a_elements:
                class_links.append('https://courses.students.ubc.ca' + a["href"])

        print(class_links)
        course_threads = []
        for link in class_links:
            thread = threading.Thread(target=self.scrape_course, args=(link,))
            thread.start()
            course_threads.append(thread)

    def scrape_course(self, link):
        course_page = requests.get(link)
        course_soup = bs.BeautifulSoup(course_page.content, 'html.parser')
        prereq_p = course_soup.find_all("p")
        prereqs = self.get_prereqs(prereq_p)
        if prereqs is not None:
            # print(f"check: {prereqs}")
            prereq_text = prereqs.get_text()
            prereq_parts = prereq_text.split(",")
            course_names = []
            print(f"Pre-req: {prereq_text}")

            for part in prereq_parts:
                print(f'part: {part}')
                # a_elements = bs.BeautifulSoup(part, "html.parser").find_all('a')
                # TODO: Handle a) either, b) One of, c) Two of, d) Single Course
                # for a in a_elements:
                #     course_names.append(a.get_text())

            # print(f"Course_names: {course_names}")

    def get_prereqs(self, prereq_p):
        prereq = None
        for p in prereq_p:
            if "Pre-req" in p.text:
                prereq = p
        return prereq


scraper = Scraper()

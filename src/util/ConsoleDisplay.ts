import {ICourseManager} from "../controller/ICourseManager";

export class consoleDisplay {
    private PRINTWIDTH: number = 144;
    private courseManager: ICourseManager;


    constructor(courseManager: ICourseManager) {
        this.courseManager = courseManager;
    }
    public displayTree(id: string) {
        this.displayTreeHelper([[id, 0]]);
    }

    private displayTreeHelper(ids: [string, number][], depth: number = 0) {
        if (ids.length == 0) {
            return
        }

        if (depth == 0) {
            let s = " ".repeat(this.PRINTWIDTH/2 - ids[0][0].length/2) + ids[0][0] +
                " ".repeat(this.PRINTWIDTH/2 - ids[0][0].length/2);
            // console.log(s.length);
            console.log(s);
        }

        let children = []
        let sizeID = 0
        for (const id in ids) {
            let offset = Number(id);
            const root = this.courseManager.getCourse(ids[offset][0]);
            const kids = this.courseManager.getChildren(root.children);
            for (const child of kids) {
                let pair: [string, number] = [child, offset];
                sizeID = sizeID + child.length;
                children.push(pair);
            }
        }
        // console.log("qcheck: ", children);

        // const root = this.getCourse();
        let numChildren = children.length;
        let connect = this.printConnection(ids, children);
        console.log(connect.length);
        console.log(connect);
        console.log(this.printSpace(children));

        const sectionLen = ((this.PRINTWIDTH - sizeID)/(numChildren*2));
        let row = "";
        for (const child of children) {
            row = row + " ".repeat(sectionLen) + child[0] + " ".repeat(sectionLen);
        }
        console.log(row);

        this.displayTreeHelper(children, depth + 1);

    }

    private printConnection(siblings: [string, number][], children: [string, number][]){
        let a = []
        for (const child of children) {
            a.push(child[1]);
        }
        let set = [...new Set(a)];
        const section = ((this.PRINTWIDTH - set.length) / (siblings.length * 2));
        let row = "";
        let offset = -1;
        // s = offset + 1, don't add, else, add s - (offset + 1)
        // console.log("SECTION: ", section, " SET: ", set, " siblings: ", siblings);
        for (const s of set) {

            row = row + " ".repeat(section) + " ".repeat(section * (s - (offset + 1)) * 2) + "|" + " ".repeat(section);
            offset = s;
        }

        return row;

    }

    private printSpace(children: [string, number][]) {
        let size = children.length;
        let offset = -1;
        let section;
        if (size > 0) {
            section = this.PRINTWIDTH / (size*2);
        } else {
            section = 0;
        }
        let space = "";
        for (const child of children) {
            if (offset == -1) {
                space = " ".repeat(section);
                offset = child[1];
            } else if (child[1] == offset) {
                space = space + "-".repeat(section * 2);
            } else {
                offset = child[1];
                space = space + " ".repeat(section * 2);
            }
        }
        return space + " ".repeat(section) ;
    }
}
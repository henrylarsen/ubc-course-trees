import {CourseDependencyObject, ICourseManager} from "./ICourseManager";
import * as fs from "fs-extra";
import Course from "../model/Course";


export default class CourseManager implements ICourseManager {
    public courses: {[id: string]: Course} = {};
    public getCourse(id: string): Course {
        if (this.courses[id]) {
            return this.courses[id];
        } else {
            console.error("No course found");
            throw new Error("No course found");
        }
    }

    public async initialize() {

            // fs.readJSON("./data/data.json").then((result) => {
            //     // console.log(result);
            //     this.processTree(result.tree);
            // }).catch((error) => {
            //     console.error("Error: ", error);
            //     throw new Error("Cannot process data");
            // });
        try {
            const result = await fs.readJSON("./data/data.json");
            this.processTree(result.tree);
        } catch (error) {
            console.error("error: ", error);
            throw new Error("Cannot process data");
        }
    }

    public getCourses() {
        console.log("CHECK: ", this.courses);
        return this.courses;
    }

    private processTree(tree: any) {
        for (const node of tree) {
            // console.log(node);
            this.addNode(node.id, node.children);
        }
    }

    private addNode(id: string, children: CourseDependencyObject) {
        if (this.courses[id]) {
            throw new Error("duplicate course");
        } else {
            this.courses[id] = new Course(id, children);
        }
        // console.log(this.courses)
    }

}
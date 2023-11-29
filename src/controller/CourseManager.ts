import {ICourseManager, AbstractNode} from "./ICourseManager";
import {CNode} from "../model/CNode";
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
        try {
            const jsonData = fs.readJSON("./data/data.json").then((result) => {
                // console.log(result);
                this.processTree(result.tree);
            });

        } catch (e) {
            console.error("error: ", e);
            throw new Error("Cannot process data");
        }
    }

    private processTree(tree: any) {
        for (const node of tree) {
            console.log(node);
            this.addNode(node.id, node.children);
        }
    }

    private addNode(id: string, children: string[]) {
        if (this.courses[id]) {
            throw new Error("duplicate course");
        } else {
            this.courses[id] = new Course(id, children);
        }
    }

}
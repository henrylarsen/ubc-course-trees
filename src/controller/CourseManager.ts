import {CourseDependencyObject, ICourseManager} from "./ICourseManager";
import * as fs from "fs-extra";
import Course from "../model/Course";
import {consoleDisplay} from "../util/ConsoleDisplay";
import {cursorTo} from "readline";



export default class CourseManager implements ICourseManager {
    public courses: {[id: string]: Course} = {};
    private consoleDisplay;

    constructor() {
        this.consoleDisplay = new consoleDisplay(this);
        // this.initialize();
    }
    public displayTree (id: string) {
        this.consoleDisplay.displayTree(id);
    }

    // public displayTree(id: string) {
    //     const course = this.courses[id];
    //     console.log(course.id);
    //     this.printTree(course.children);
    // }
    //
    // private printTree(children: CourseDependencyObject, depth: number = 0, id?: string) {
    //     if (id) {
    //         const indentation = "  ".repeat(depth);
    //         console.log(`${indentation}- ${id}`);
    //     }
    //
    //     // const children = node.children;
    //     if (children) {
    //         if (children.AND) {
    //             for (const child of children.AND) {
    //                 this.printTree(child, depth + 1);
    //             }
    //         } else if (children.OR) {
    //             for (const child of children.OR) {
    //                 this.printTree(child, depth + 1);
    //             }
    //         } else if (children && children.DIRECT) {
    //             this.printTree(this.courses[children.DIRECT].children, depth + 1, children.DIRECT);
    //         }
    //     }
    //
    // }

    public getChildren(root: CourseDependencyObject): string[] {
        if (root.DIRECT) {
            return [root.DIRECT];
        } else if (root.AND) {
            return root.AND.flatMap((child) => this.getChildren(child));
        } else if (root.OR ){
            return root.OR.flatMap((child) => this.getChildren(child));
        }  else {
            return [];
        }
    }

    public getDependencies(id: string) {
        let subDict: {[id: string]: Course} = {};
        const course = this.getCourse(id);
        const queue = this.getChildren(course.children)
        let children = this.getChildren(course.children);
        children.push(id);
        while (queue.length > 0) {
            const currentID = queue.shift();
            if (currentID != undefined) {
                children.push(currentID);
                const currentCourse = this.getCourse(currentID);
                queue.push(...this.getChildren(currentCourse.children));
            }
        }

        const setChildren = [...new Set(children)];

        for (const child of setChildren) {
            subDict[child] = this.getCourse(child);
        }
        console.log(subDict);
        return subDict;

    }
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
            const result = await fs.readJSON("./data/data2.json");
            this.processTree(result.tree);
            // this.initializeGraph();
        } catch (error) {
            console.error("error: ", error);
            throw new Error("Cannot process data");
        }
        // console.log(this.getCourses());
    }

    public getCourses() {
        // console.log("CHECK: ", this.courses);
        return this.courses;
    }

    private processTree(tree: any) {
        for (const node of tree) {
            this.addNode(node.id, node.children);
        }
    }

    private addNode(id: string, children: CourseDependencyObject) {
        if (this.courses[id]) {
            throw new Error("duplicate course");
        } else {
            this.courses[id] = new Course(id, children);
        }
    }
}


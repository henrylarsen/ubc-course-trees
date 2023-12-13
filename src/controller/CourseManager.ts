import {CourseDependencyObject, ICourseManager} from "./ICourseManager";
import * as fs from "fs-extra";
import Course from "../model/Course";
// import {DirectedAcyclicGraph} from "typescript-graph/dist/types";
import {DirectedAcyclicGraph} from "typescript-graph";
import {consoleDisplay} from "../util/ConsoleDisplay";
// import {Graph} from "typescript-graph/dist/types";
// / <reference path="./node_modules/typescript-graph/dist/types/graph.d.ts" />
// import {Graph} from "typescript-graph";


// type NodeType = {id: string, children: any[]};

export default class CourseManager implements ICourseManager {
    public courses: {[id: string]: Course} = {};
    private consoleDisplay;
    // private graph =  new DirectedAcyclicGraph<NodeType>((n: NodeType) => n.id);

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
        console.log(this.getCourses());
    }

    public getCourses() {
        // console.log("CHECK: ", this.courses);
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

    // private initializeGraph() {
    //     // console.log("courses: ", this.courses);
    //     Object.keys(this.courses).forEach((key) => {
    //         // let children = this.getChildren(this.courses[key].children);
    //         // console.log("key, ", key)
    //         // this.graph.insert({id: key, children: []});
    //     });
    //
    //     // console.log("PRINT GRAPH", this.graph.getNodes());
    //
    //     const listNodes = this.graph.getNodes();
    //     for (const n of listNodes) {
    //         let children = this.getChildren(this.courses[n.id].children);
    //         this.graph.upsert({id: n.id, children: children})
    //         for (let child of children) {
    //             this.graph.addEdge(n.id, child);
    //         }
    //     }
    //     const printNodes = this.graph.getNodes();
    //     for (let node of printNodes) {
    //         // console.log(node.id, node.children);
    //     }

    // }
}


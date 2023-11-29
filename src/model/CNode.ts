import {AbstractNode} from "../controller/ICourseManager";
import * as fs from "fs-extra";
import {readJSON} from "fs-extra";

export class CNode implements AbstractNode{
    public id: string;
    public children: string[];

    constructor(id: string, children: string[]) {
        this.id = id;
        this.children = [];
    }

     public addChild(childID: string): void {
        this.children.push(childID);
    }

}
import {CNode} from "./CNode";

export default class Course extends CNode {
    // public name: string;
    // public preRequisites: Course[];
    // public children: CNode[];
    // public coRequisites: Course[];

    constructor(id: string, children: string[]) {
        super(id, children);
    }

}
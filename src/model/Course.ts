import {CourseDependencyObject, ICourse} from "../controller/ICourseManager";

export default class Course implements ICourse {
    public id: string;
    public children: CourseDependencyObject;

    constructor(id: string, children: CourseDependencyObject ) {
        // console.log(id, children);
        this.id = id;
        this.children = children;
    }

     public setChild(children: CourseDependencyObject): void {
        this.children = children;
    }
}
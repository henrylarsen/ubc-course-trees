import Course from "../model/Course";

export interface AbstractNode {
    addChild(childID: string): void;
}

export interface ICourseManager {
    initialize(id: string, content: string): void;
    getCourse(id: string): Course;
}

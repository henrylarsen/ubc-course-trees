import Course from "../model/Course";

type CourseDependency = string | CourseDependencyObject;

export interface CourseDependencyObject {
    OR?: CourseDependency[];
    AND?: CourseDependency[];
    DIRECT?: string;
}
// export interface AbstractNode {
//     addChild(childID: string): void;
// }

export interface ICourse {
    id: string;
    children: CourseDependencyObject;
}

export interface ICourseManager {
    initialize(id: string, content: string): void;
    getCourse(id: string): Course;
}

import Teacher from './teacher';
import Auditorium from './auditorium';
import Group from './group';

export default class Lesson {
    constructor(
        public readonly order: number,
        public readonly title: string,
        public readonly type: string,
        public readonly teachers: Array<Teacher>,
        public readonly auditoriums: Array<Auditorium>,
        public readonly groups: Array<Group>,
        public readonly dateFrom: Date,
        public readonly dateTo: Date
    ) { }
}
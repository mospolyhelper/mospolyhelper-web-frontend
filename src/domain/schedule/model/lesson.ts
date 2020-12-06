import Teacher from './teacher';
import Auditorium from './auditorium';
import Group from './group';

export default interface Lesson {
    readonly order: number;
    readonly title: string;
    readonly type: string;
    readonly teachers: Array<Teacher>;
    readonly auditoriums: Array<Auditorium>;
    readonly groups: Array<Group>;
    readonly dateFrom: Date;
    readonly dateTo: Date;
}
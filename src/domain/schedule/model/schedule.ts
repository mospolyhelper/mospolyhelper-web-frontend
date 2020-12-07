import Lesson from './lesson';

export default interface Schedule {
    readonly dailySchedules: Array<Array<Lesson>>;
    readonly dateFrom: Date;
    readonly dateTo: Date;
}
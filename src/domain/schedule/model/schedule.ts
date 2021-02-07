import Lesson from './lesson';

export default interface Schedule {
    dailySchedules: Array<Array<Lesson>>;
    dateFrom: Date;
    dateTo: Date;
}
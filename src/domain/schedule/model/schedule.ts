import Lesson from './lesson';

export default class Schedule {
    constructor(
        public readonly dailySchedules: Array<Array<Lesson>>,
        public readonly dateFrom: Date,
        public readonly dateTo: Date
    ) { }
}
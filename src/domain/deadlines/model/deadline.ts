export default class Deadline {
    public completed: boolean = false;

    constructor(
        public name: string,
        public description: string,
        public pinned: boolean = false,
        public date: Date = new Date(),
        public importance: number = 0,
        public id: number = 0
    ) { }
}
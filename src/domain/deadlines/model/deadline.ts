export default class Deadline {
    public completed: boolean = false;
    public id: number = 0;
    constructor(
        public name: string,
        public description: string,
        public pinned: boolean = false,
        public date: Date = new Date(),
        public importance: string = ""
    ) { }
}
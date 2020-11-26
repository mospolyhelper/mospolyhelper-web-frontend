export default class Deadline {
    public completed: boolean = false;
    constructor(
        public name: string,
        public description: string,
        public pinned: boolean = false,
        public date: string = "",
        public time: string = "",
        public importance: number = 0
    ) { }
}
export default class Deadline {
    public completed: boolean = false;

    constructor(
        public name: string,
        public description: string,
        public pinned: boolean = false,
        public date: string = new Date().toLocaleString(),
        public importance: number = 0,
        public id: number = 0
    ) { }
}
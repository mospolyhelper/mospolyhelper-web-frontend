export default class Group {
    constructor(
        public readonly title: string,
        public readonly evening: boolean
    ) { }

    static empty = new Group('', false);
}
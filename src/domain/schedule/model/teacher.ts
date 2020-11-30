export default class Teacher {
    constructor(
        public readonly names: Array<string>
    ) { }

    qgetFullNameq() {
        return this.names.join(' ');
    }
}
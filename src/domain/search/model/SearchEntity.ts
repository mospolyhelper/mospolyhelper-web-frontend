export default class SearchEntity {

    constructor(
        public id: number,
        public name: string,
        public group: string,
        public direction: string,
        public specialization: string,
        public course: string,
        public educationForm: string
    ) { }
}
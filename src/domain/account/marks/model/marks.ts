import Predmet from "./predmet";

export default class Marks {
    constructor(
        //marks: Record<string, Record<string, Predmet[]>>
        marks: Map<string, Map<string, Array<Predmet>>>
    ) { }
}
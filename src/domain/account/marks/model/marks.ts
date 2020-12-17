import Predmet from "./predmet";

export default interface Marks {
        //marks: Record<string, Record<string, Predmet[]>>
        readonly marks: Map<string, Map<string, Array<Predmet>>>
}
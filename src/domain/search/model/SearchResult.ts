import SearchEntity from "./SearchEntity";

export default class SearchResult {
    constructor(
        public pagesCount: number,
        public currentPage: number,
        public portolios: Array<SearchEntity>
    ) { }
}
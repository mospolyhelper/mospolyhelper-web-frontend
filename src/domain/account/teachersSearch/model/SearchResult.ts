﻿import SearchEntity from "./SearchEntity";

export default class SearchResult {
    constructor(
        public pageCount: number,
        public currentPage: number,
        public teachers: Array<SearchEntity>
    ) { }
}
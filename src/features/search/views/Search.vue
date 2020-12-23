<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <form class="example" @submit.prevent="find(findStr, page = 1)">
        <input type="text" name="search" placeholder="Поиск" v-model.trim.lazy="findStr">
        <button type="submit"><i class="fa fa-search"></i></button>
    </form>
    <br />
    <searchForm v-on:applyFilter="advancedSearch"
                v-on:stopSearch="isSearching=false"
                :isSearch="isSearching" />
    <br />
    <searchList :searchList="searchRes"
                :isLoading="isLoading">
    </searchList>

    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/search/components/SearchList.vue";
    import searchForm from "@/features/search/components/SearchForm.vue";
    import SearchUseCase from "@/domain/search/usecase/searchUseCase";
    import SearchEntity from "../../../domain/search/model/SearchEntity";
    import SearchResult from "../../../domain/search/model/SearchResult";

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                findStr: "",
                searchString: "",
                page: 1,
                pageCount: 1,
                isLoading: false,
                isSearching: false
            }
        },
        components: {
            searchList,
            searchForm
        },
        methods: {
            find(s: string, page: number) {
                this.isSearching = false;
                this.searchString = s;
                console.log("loading data at page", page)
                this.isLoading = true;
                if (this.page == 1) {
                    this.searchRes = [];
                    useCase.searchByQuery(this.findStr, this.page).then((val: SearchResult | null) => {
                        window.addEventListener('scroll', this.handleScroll);
                        if (val != null) {
                            this.searchRes = val.portfolios;
                            this.pageCount = val.pageCount;
                        }
                        else
                            this.searchRes = [];
                        this.isLoading = false;
                        console.log("loaded data at page", page, val)
                    });
                } else {
                    useCase.searchByQuery(this.findStr, this.page).then(val => {
                        if (val != null)
                            val.portfolios.forEach(v => this.searchRes.push(v));
                        this.isLoading = false;
                        console.log("loaded data at page", page, val);
                    });
                }
            },
            handleScroll(event: Event) {
                console.log(window.scrollY, window.innerHeight, document.body.scrollHeight, this.pageCount);
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight && !this.isLoading && this.page < this.pageCount) {
                    this.find(this.searchString, ++this.page);
                }
            },
            advancedSearch(direction: string, profile: string, group: string, course: string[], form: string[]) {
                window.removeEventListener('scroll', this.handleScroll);
                this.page = 1
                console.log("loading data at page", 1)
                this.isSearching = true;
                this.isLoading = true;
                this.searchRes = [];
                useCase.searchByQuery(this.findStr, this.page).then((val: SearchResult | null) => {
                    if (val != null) {
                        this.searchRes = useCase.filter(val.portfolios, direction, profile, group, course, form);
                        this.pageCount = val.pageCount;
                    }
                    else
                        this.searchRes = [];
                    console.log("loaded data at page", 1, val)
                    this.isLoading = false;
                    this.recursiveSearch(direction, profile, group, course, form)
                });
            },
            recursiveSearch(direction: string, profile: string, group: string, course: string[], form: string[]) {
                if (this.page < this.pageCount && this.isSearching) {
                    console.log("loading data at page", this.page + 1)
                    this.isLoading = true;
                    useCase.searchByQuery(this.findStr, ++this.page).then((val: SearchResult | null) => {
                        if (val != null) {
                            useCase.filter(val.portfolios, direction, profile, group, course, form).forEach(v => this.searchRes.push(v));
                        }
                        console.log("loaded data at page", this.page, val)
                        this.isLoading = false;
                        this.recursiveSearch(direction, profile, group, course, form)
                    });
                }
            }
        },
        //created() {
        //    window.addEventListener('scroll', this.handleScroll);
        //},
        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    });

    export default search;

</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .example {
        text-align: center
    }

    /* Style the search field */
    form.example input[type=text] {
        padding: 10px;
        font-size: 17px;
        border: 1px solid grey;
        min-width: 300px;
        background: #f1f1f1;
    }
    /* Style the submit button */
    form.example button {
        padding: 10px;
        background: #2196F3;
        color: white;
        font-size: 17px;
        border: 1px solid grey;
        border-left: none; /* Prevent double borders */
        cursor: pointer;
        min-width: 50px;
        left: 100%;
    }

        form.example button:hover {
            background: #0b7dda;
        }

    /* Clear floats */
    form.example::after {
        content: "";
        clear: both;
        display: table;
    }
</style>

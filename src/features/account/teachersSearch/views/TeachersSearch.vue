<template>
    <p>
        Поиск
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim.lazy="findStr" />
    <button @click="find(findStr, page = 1)">Найти</button>
    <br />
    <!--<searchForm v-on:applyFilter="advancedSearch"
                v-on:stopSearch="isSearching=false"
                :isSearch="isSearching"
                />-->
    <searchList :searchList="searchRes"
                :isLoading="isLoading">
    </searchList>

    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/account/teachersSearch/components/SearchList.vue";
    import searchForm from "@/features/account/teachersSearch/components/SearchForm.vue";
    import SearchUseCase from "@/domain/account/teachersSearch/usecase/searchUseCase";
    import SearchEntity from "@/domain/account/teachersSearch/model/SearchEntity";
    //import BootstrapVue from 'bootstrap-vue'
    import SearchResult from "@/domain/account/teachersSearch/model/SearchResult";
    import AuthLocalDataSource from "../../../../data/account/auth/local/authLocalDataSource";

    let useCase = new SearchUseCase();
    const sessionId = new AuthLocalDataSource().getSessionId();
    

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                findStr: "",
                searchString: "",
                page: 1,
                pagesCount: 1,
                isLoading: false,
                isSearching: false
            }
        },
        components: {
            searchList,
            //searchForm
        },
        methods: {
            find(s: string, page: number) {
                this.isSearching = false;
                this.searchString = s;
                console.log("loading data at page", page)
                this.isLoading = true;
                if (this.page == 1) {
                    this.searchRes = [];
                    useCase.searchByQuery(this.findStr, this.page, sessionId).then(val => {
                        window.addEventListener('scroll', this.handleScroll);
                        if (val != null) {
                            this.searchRes = val.teachers;
                            this.pagesCount = val.pageCount;
                        }
                        else
                            this.searchRes = [];
                        this.isLoading = false;
                        console.log("loaded data at page", page, val)
                    });
                } else {
                    useCase.searchByQuery(this.findStr, this.page, sessionId).then(val => {
                        if (val != null)
                            val.teachers.forEach(v => this.searchRes.push(v));
                        this.isLoading = false;
                        console.log("loaded data at page", page, val);
                    });
                }
            },
            handleScroll(event: Event) {
                console.log(window.scrollY, window.innerHeight, document.body.scrollHeight, this.pagesCount);
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight && !this.isLoading && this.page < this.pagesCount) {
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
                //useCase.searchByQuery(this.findStr, this.page, sessionId).then((val: SearchResult | null) => {
                    //if (val != null) {
                    //    this.searchRes = useCase.filter(val.portolios, direction, profile, group, course, form);
                    //    this.pagesCount = val.pagesCount;
                    //}
                    //else
                    //    this.searchRes = [];
                    //console.log("loaded data at page", 1, val)
                    //this.isLoading = false;
                    //this.recursiveSearch(direction, profile, group, course, form)
                //});
            },
            recursiveSearch(direction: string, profile: string, group: string, course: string[], form: string[]) {
                if (this.page < this.pagesCount && this.isSearching) {
                    //console.log("loading data at page", this.page + 1)
                    //this.isLoading = true;
                    //useCase.searchByQuery(this.findStr, ++this.page).then((val: SearchResult | null) => {
                    //    if (val != null) {
                    //        useCase.filter(val.portolios, direction, profile, group, course, form).forEach(v => this.searchRes.push(v));
                    //    }
                    //    console.log("loaded data at page", this.page, val)
                    //    this.isLoading = false;
                    //    this.recursiveSearch(direction, profile, group, course, form)
                    //});
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
    
</style>

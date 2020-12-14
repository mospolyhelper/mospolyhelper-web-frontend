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
    import SearchUseCase from "@/domain/account/teachersSearch/usecase/searchUseCase";
    import SearchEntity from "@/domain/account/teachersSearch/model/SearchEntity";

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                findStr: "",
                searchString: "",
                page: 1,
                pagesCount: 1,
                isLoading: false
            }
        },
        components: {
            searchList
        },
        methods: {
            find(s: string, page: number) {
                this.searchString = s;
                let self = this
                console.log("loading data at page", page)
                this.isLoading = true;
                if (this.page == 1) {
                    this.searchRes = [];
                    useCase.searchByQuery(this.searchString, this.page).then(val => {
                        window.addEventListener('scroll', this.handleScroll);
                        if (val != null) {
                            if (val.isSuccess) {
                                this.searchRes = val.value.teachers;
                                this.pagesCount = val.value.pageCount;
                            } else if (val.isFailure) {
                                alert(val.errorOrNull());
                            }
                        }
                        else
                            this.searchRes = [];
                        this.isLoading = false;
                        console.log("loaded data at page", page, val)
                    });
                } else {
                    useCase.searchByQuery(this.searchString, this.page).then(val => {
                        if (val != null)
                            if (val.isSuccess) {
                                val.value.teachers.forEach(function (v: SearchEntity) { self.searchRes.push(v) });
                            } else if (val.isFailure) {
                                alert(val.errorOrNull());
                            }
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
            }
        },
        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    });

    export default search;

</script>

<style scoped>
    
</style>

<template>
    <p>
        Поиск
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim.lazy="findStr" />
    <button @click="find(findStr, page = 0)">Найти</button>
    <searchList :searchList="searchRes"
                :isLoading="isLoading">
    </searchList>
    
    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/search/components/SearchList.vue";
    import SearchUseCase from "@/domain/search/usecase/searchUseCase";
    import SearchEntity from "../../../domain/search/model/SearchEntity";
    import BootstrapVue from 'bootstrap-vue'

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                findStr: "",
                page: 0,
                isLoading: false
            }
        },
        components: {
            searchList
        },
        methods: {
            find(s: String, page: number = 0) {
                console.log("loading data at page", page)
                this.isLoading = true;
                if (this.page == 0) {
                    this.searchRes = [];
                    useCase.getScheduleByGroup(this.findStr).then(val => {
                        this.searchRes = val;
                        this.isLoading = false;
                        console.log("loaded data at page", page, this.searchRes)
                    });
                } else {
                    useCase.getScheduleByGroup(this.findStr).then(val => {
                        this.searchRes.concat(val);
                        val.forEach(v => this.searchRes.push(v));
                        this.isLoading = false;
                        console.log("loaded data at page", page, this.searchRes);
                    });
                }
            },
            handleScroll(event: Event) {
                console.log(window.scrollY, window.innerHeight, document.body.scrollHeight);
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight && !this.isLoading) {
                    this.find(this.findStr, ++this.page);
                }
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },
        unmounted() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    });

    export default search;

</script>

<style scoped>
    
</style>

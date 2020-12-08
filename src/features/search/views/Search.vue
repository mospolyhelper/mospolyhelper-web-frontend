<template>
    <p>
        Поиск
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim.lazy="findStr" />
    <button @click="find(findStr)">Найти</button>
    <searchList :searchList="searchRes">
    </searchList>
    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/search/components/SearchList.vue";
    import SearchUseCase from "@/domain/search/usecase/searchUseCase";
    import SearchEntity from "../../../domain/search/model/SearchEntity";

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                findStr: ""
            }
        },
        components: {
            searchList
        },
        methods: {
            find(s: String, page: number = 0) {
                useCase.getScheduleByGroup(s, page).then(value => {
                    this.searchRes = value;
                })
                console.log(this.searchRes);
            }
        },
        watch: {
            findStr(newStr, oldStr) {
                if (newStr !== oldStr) {
                    //this.find(newStr);
                }
            }
        },
        computed: {
            
        }
    });

    export default search;
</script>

<style scoped>
</style>

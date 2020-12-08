<template>
    <p>
        Поиск
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim="findStr" />
    <!--<button @click="find">Найти</button>-->
    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/search/components/SearchList.vue"

    const search = defineComponent({
        data() {
            return {
                searchRes: [],
                findStr: ""
            }
        },
        components: {
            searchList
        },
        methods: {
            find(s: String) {
                console.log(s);
            }
        },
        watch: {
            findStr(newStr, oldStr) {
                if (newStr !== oldStr) {
                    this.find(newStr);
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

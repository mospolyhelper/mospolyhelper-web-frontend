<template>
    <p>
        Оценочки
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <markList :courses="searchRes"
                :isLoading="isLoading">
    </markList>

    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markList from "@/features/account/marks/components/MarkList.vue";
    import SearchUseCase from "@/domain/account/marks/usecase/marksUseCase";

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Map(),
                isLoading: false
            }
        },
        components: {
            markList
        },
        methods: {
            find() {
                console.log("loading data")
                this.isLoading = true;
                useCase.searchByQuery().then(val => {
                    if (val != null) {
                        if (val.isSuccess) {
                            this.searchRes = val.value.marks;
                        } else if (val.isFailure) {
                            alert(val.errorOrNull());
                        }
                    }
                    this.isLoading = false;
                    console.log("loaded data", val)
                });
            }
        },
        created() {
            this.find();
        }
    });

    export default search;

</script>

<style scoped>
    
</style>

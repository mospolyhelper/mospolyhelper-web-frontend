<template>
    <searchList :searchList="searchRes"
                :isLoading="isLoading">
    </searchList>

    <br />

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchList from "@/features/account/classmates/components/SearchList.vue";
    import SearchUseCase from "@/domain/account/classmates/usecase/searchUseCase";
    import SearchEntity from "@/domain/account/classmates/model/SearchEntity";

    let useCase = new SearchUseCase();

    const search = defineComponent({
        data() {
            return {
                searchRes: new Array<SearchEntity>(),
                isLoading: false
            }
        },
        components: {
            searchList
        },
        methods: {
            find() {
                console.log("loading data")
                this.isLoading = true;
                useCase.searchByQuery().then(val => {
                    if (val != null) {
                        if (val.isSuccess) {
                            this.searchRes = val.value;
                        } else if (val.isFailure) {
                            alert(val.errorOrNull());
                        }
                    }
                    else
                        this.searchRes = [];
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

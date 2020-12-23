<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <form class="example" @submit.prevent="find(findStr, page = 1)">
        <input type="text" name="search" placeholder="Поиск" v-model.trim.lazy="findStr">
        <button type="submit"><i class="fa fa-search"></i></button>
    </form>
    <br />
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
    * {
        box-sizing: border-box;
    }

    .example {
        text-align: center;
    }

    /* Style the search field */
    form.example input[type=text] {
        padding: 10px;
        font-size: 17px;
        border: 1px solid grey;
        min-width:300px;
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

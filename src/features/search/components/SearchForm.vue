<template>
    <button  @click="isVisible=!isVisible">Дополнительные параметры поиска</button>
    <form class="searchForm" @submit.prevent="send" v-if="isVisible">
        <input type="text" placeholder="Направление" v-model.trim="direction" /> <br />
        <input type="text" placeholder="Профиль" v-model.trim="profile" /><br />
        <input type="text" placeholder="Группа" v-model.trim="group" /><br />
        <input type="checkbox" v-model="course" value="1" />1 курс<br />
        <input type="checkbox" v-model="course" value="2" />2 курс<br />
        <input type="checkbox" v-model="course" value="3" />3 курс<br />
        <input type="checkbox" v-model="course" value="4" />4 курс<br />
        <input type="checkbox" v-model="course" value="5" />5 курс<br />
        <input type="checkbox" v-model="course" value="6" />6 курс<br />
        Форма обучения<br />
        <input type="checkbox" value="Очная" v-model="form" />Очная<br />
        <input type="checkbox" value="Очно-заочная" v-model="form" />Очно-заочная<br />
        <input type="checkbox" value="Заочная" v-model="form" />Заочная<br />
        <button @click="">Применить</button>
        <button @click="$emit('stopSearch')" v-if="isSearch">Остановить поиск</button>
    </form>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const SearchForm = defineComponent({
        props: {
            isSearch: Boolean,
        },
        data() {
            return {
                isVisible: false,
                direction: "",
                profile: "",
                group: "",
                course: [],
                form: []
            }
        },
        methods: {
            send() {
                console.log("applied", this.direction, this.profile, this.group, this.course, this.form);
                this.$emit('applyFilter', this.direction, this.profile, this.group, this.course, this.form);
            }
        }
    });

    export default SearchForm;
</script>

<style scoped>
    .searchForm {
        background: #fff;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        border-radius: 25px;
        min-width: 200px;
        max-width: 500px;
    }
</style>
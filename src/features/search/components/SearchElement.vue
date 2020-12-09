<template>
    <div class="searchElement">
        <div v-if="degree != ''" class="degree">{{degree}}</div>
        <div class="title">{{name}}</div>
        <div>Направление: {{direction}}</div>
        <div v-if="specialization != ''">Профиль: {{specialization}}</div>
        <div v-if="group != ''" class="group">{{group}}</div>
        <div class="course">{{course}} курс</div>
        <div class="form">{{educationForm}} форма обучения</div>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";


    const searchElement = defineComponent({
        props: {
            name: String,
            group: String,
            direction: String,
            specialization: String,
            course: String,
            educationForm: String
        },
        methods: {
            
        },
        computed: {
            degree: function (): string {
                let d = this.direction;
                let res = "";
                if (d?.indexOf(".02.") != -1) {
                    res = "СПО"
                }
                if (d?.indexOf(".03.") != -1) {
                    res = "Бакалавриат"
                }
                if (d?.indexOf(".04.") != -1) {
                    res = "Магистратура"
                }
                if (d?.indexOf(".05.") != -1) {
                    res = "Специалитет"
                }
                if (d?.indexOf(".06.") != -1) {
                    res = "Аспирантура"
                }
                if (res == "") {
                    if (d?.indexOf("03") != -1) {
                        res = "Бакалавриат"
                    }
                    if (d?.indexOf("04") != -1) {
                        res = "Магистратура"
                    }
                    if (d?.indexOf("05") != -1) {
                        res = "Специалитет"
                    }
                }
                return res;
            }
        }
    });

    export default searchElement;
</script>

<style scoped>
    .searchElement {
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


    .title {
        font-weight: bold;
    }

    .form {
        background: #d1eafd;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .course {
        background: #fac6ac;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .group {
        background: #66CDAA;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .degree {
        background: #fac6ac;
        float: right;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
    }
    
</style>
<template>
    <div class="searchElement">
        <div class="mark" v-bind:class="(mark == 'Зачтено' || mark == 'Отлично' || mark == 'Хорошо' || mark == 'Удовлетворительно') ? good : bad">{{mark}}</div>
        <div><b>{{subject}}</b></div>
        <div>{{loadType}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const searchElement = defineComponent({
        props: {
            subject: String,
            loadType: String,
            mark: String
        },
        methods: {
            
        },
        computed: {

        },
        data() {
            return {
                good: 'good',
                bad: 'bad'
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
        min-height: 50px;
    }


    .mark {
        color: white;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
        float:right;
    }

    .good {
        background-color: #4CAF50cf;
    }
    /* Green */
    .bad {
        background-color: #f44336ea;
    }
    
</style>
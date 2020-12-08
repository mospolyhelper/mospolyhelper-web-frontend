<template>
    <div class="searchElement">
       
        <div class="title">{{name}}</div>


    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";


    const searchElement = defineComponent({
        props: {
            name: String,

        },
        methods: {
            
        },
        computed: {
           
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
</style>
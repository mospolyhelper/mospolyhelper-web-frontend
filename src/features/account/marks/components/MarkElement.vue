<template>
    <div class="searchElement">
        <div >{{subject}}</div>
        <div >{{loadType}}</div>
        <div>{{mark}}</div>
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
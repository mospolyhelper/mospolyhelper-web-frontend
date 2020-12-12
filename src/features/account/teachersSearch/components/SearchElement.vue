<template>
    <div class="searchElement">
        <div class="title">{{name}}</div>
        <div>{{info}}</div>
        <div>Профиль: {{avatarUrl}}</div>
        <div>{{status}}</div>
        <div>{{dialogKey}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const searchElement = defineComponent({
        props: {
            name: String,
            info: String,
            avatarUrl: String,
            status: String,
            dialogKey: String
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
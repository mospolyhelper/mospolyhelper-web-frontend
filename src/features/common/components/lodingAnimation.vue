<template>
    <div class="loader" v-show="showing"/>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    const loader = defineComponent({
        props: {
            showing: Boolean
        }
    })
    export default loader;
</script>

<style scoped>
    .loader {
        border: 6px solid #f3f3f3; /* Light grey */
        border-top: 6px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 35px;
        height: 35px;
        animation: spin 2s linear infinite;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
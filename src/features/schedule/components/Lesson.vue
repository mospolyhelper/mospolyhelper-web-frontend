<template>
    <div class="lesson">
        <div>{{type}}</div>
        <div>{{title}}</div>
        <div>{{teacher}}</div>
        <div>{{auditorium}}</div>
        <div>{{dateFrom}} - {{dateTo}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const lesson = defineComponent({
        props: {
            order: String,
            title: String,
            type: String,
            teacher: String,
            auditorium: String,
            dateFrom: String,
            dateTo: String
        }
    });

    export default lesson;
</script>

<style scoped>
</style>
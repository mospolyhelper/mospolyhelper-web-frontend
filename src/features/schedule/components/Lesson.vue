<template>
    <div class="lesson">
        <div>{{type}}</div>
        <div>{{title}}</div>
        <div>{{teacher}}</div>
        <div v-html="auditorium"></div>
        <div>{{dateFrom}} - {{dateTo}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const lesson = defineComponent({
        props: {
            order: Number,
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

    .lesson {
        background: #fff; /* Цвет фона */
        box-shadow: 0 0 6px rgba(0,0,0,0.5); /* Параметры тени */
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 25px;
        min-width: 100%;
        width: 100%;
    }
  
</style>
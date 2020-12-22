<template>
    <div class="time" v-if="!previousEqual">{{getTime()}}</div>
    <div class="lesson">
        <div class="type">{{type}}</div>
        <div class="title">{{title}}</div>
        <div>{{teacher}}</div>
        <div v-html="auditorium"></div>
        <div>{{getFormattedDate(dateFrom)}} - {{getFormattedDate(dateTo)}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import LessonTimes from '@/domain/schedule/utils/lessonTimes'

    const lesson = defineComponent({
        props: {
            previousEqual: Boolean,
            order: Number,
            title: String,
            type: String,
            teacher: String,
            auditorium: String,
            dateFrom: Date,
            dateTo: Date
        },
        methods: {
            getTime() {
                const times = LessonTimes.getTime(this.order!, false);
                return this.order! + 1 + ') ' + times[0] + ' - ' + times[1];
            },
            getFormattedDate(date: Date) {
                const moment = require('moment');
                return moment(date).format('D MMMM');
            }
        }
    });

    export default lesson;
</script>

<style scoped>

    .lesson {
        background: #fff;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        border-radius: 25px;
        min-width: 200px;
    }
    .time {
        font-size: 16px;
        margin-left: 20px;
    }

    .type {
        background: #d1eafd;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .title {
        font-weight: bold;
    }
  
</style>
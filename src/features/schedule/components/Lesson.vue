<template>
    <div class="time" v-if="!previousEqual">{{getTime()}}</div>
    <div class="lesson">
        <div class="type"
             v-bind:class="[isImportant(type) ? 'important' : 'not-important']">{{type}}</div>
        <div class="title">{{title}}</div>
        <div>{{teacher}}</div>
        <div v-if="groups">{{groups}}</div>
        <div v-html="auditorium"></div>
        <div class="date">{{getFormattedDate(dateFrom, dateTo)}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import LessonTimes from '@/domain/schedule/utils/lessonTimes'
    import { isImportant } from '@/domain/schedule/utils/lessonUtils'

    const lesson = defineComponent({
        props: {
            previousEqual: Boolean,
            order: Number,
            title: String,
            type: String,
            teacher: String,
            groups: String,
            auditorium: String,
            dateFrom: Date,
            dateTo: Date
        },
        methods: {
            getTime() {
                const times = LessonTimes.getTime(this.order!, false);
                return this.order! + 1 + ') ' + times[0] + ' - ' + times[1];
            },
            getFormattedDate(date1: Date, date2: Date) {
                const moment = require('moment');
                if (date1.getTime() == date2.getTime()) {
                    return moment(date1).format('D MMMM');
                } else {
                    return moment(date1).format('D MMMM') + ' - ' + moment(date2).format('D MMMM');
                }
            },
            isImportant(type: string): boolean {
                return isImportant(type);
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
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .not-important {
        background: #d1eafd;
        color: #4985a3;
    }

    .important {
        background: #ff9999;
        color: #990000;
    }

    .title {
        font-weight: bold;
    }
    .date {
        font-size: 14px;
        margin-top: 5px;
        color: #888888;
    }
  
</style>
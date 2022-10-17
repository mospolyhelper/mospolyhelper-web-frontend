<template>
    <div class="time" v-if="!previousEqual">{{ getTime() }}</div>
    <div class="lesson">
        <div class="type">{{ type }}</div>
        <div class="title">{{ title }}</div>
        <div class="auditorium" v-html="auditorium"></div>
        <div class="teacher">{{ teacher }}</div>
        <small class="dateFromTo">{{ getFormattedDate(dateFrom) }} - {{ getFormattedDate(dateTo) }}</small>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LessonTimes from "@/domain/schedule/utils/lessonTimes";

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
            return this.order! + 1 + ") " + times[0] + " - " + times[1];
        },
        getFormattedDate(date: Date) {
            const moment = require("moment");
            return moment(date).format("D MMMM");
        }
    }
});

export default lesson;
</script>

<style scoped>
.lesson {
    padding: 12px 16px 8px;
    min-width: 200px;
}
.time {
    font-size: 16px;
    background: #ededed;
    padding: 4px 6px;
}
.type {
    color: #4985a3;
    margin-bottom: 4px;
    border-radius: 10px;
    display: inline-block;
}
.type:before {
    content: "  \25CF  ";
}
.title {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
}
.auditorium {
    padding: 4px 0 6px;
}
.dateFromTo {
    color: rgba(0, 0, 0, 0.4);
}
.teacher {
    color: #ce8a5a;
    font-size: 14px;
    line-height: 14px;
}
</style>

<template>
    <div class="dailySchedule">
        <lesson v-for="lesson in dailySchedule"
                :order="lesson.order"
                :title="lesson.title"
                :type="lesson.type"
                :teacher="getTeachers(lesson)"
                :auditorium="getAuditoriums(lesson)"
                dateFrom="14 сентября"
                dateTo="23 декабря"></lesson>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import lesson from "@/features/schedule/components/Lesson.vue"
import Lesson from '../../../domain/schedule/model/lesson';

    const dailySchedule = defineComponent({
        props: {
            dailySchedule: Array
        },
        components: {
            lesson
        },
        methods: {
            getTeachers(lesson: Lesson): String {
                return lesson.teachers.map(it => it.names.join(' ')).join(', ')
            },
            getAuditoriums(lesson: Lesson): String {
                return lesson.auditoriums.map(it => it.title).join(', ')
            }
        }
    });

    export default dailySchedule;
</script>

<style scoped>
    .dailySchedule {
        margin-right: 10px;
        margin-left: 10px;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
    }
</style>
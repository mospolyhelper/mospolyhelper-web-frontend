<template>
    <div class="schedule">
        <h1>{{ msg }}</h1>
        <p>
            Расписание занятий
            <a href="https://vuejs.org" target="_blank">Vue.js</a> and
            <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
        </p>
    </div>
    <lesson :order="lesson.order" 
            :title="lesson.title" 
            :type="lesson.type" 
            :teacher="lesson.teachers[0].names[0]"
            :auditorium="lesson.auditoriums[0].title"
            dateFrom="14 сентября"
            dateTo="23 декабря"></lesson>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Lesson from "@/domain/schedule/model/lesson"
    import Teacher from '../../../domain/schedule/model/teacher';
    import Auditorium from '../../../domain/schedule/model/auditorium';
    import Group from '../../../domain/schedule/model/group';
    import lesson from "@/features/schedule/components/Lesson.vue"

    const schedule = defineComponent({
        props: {
            msg: String
        },
        data() {
            return {
                lesson: new Lesson(
                    1,
                    'Технология кроссплатформенного программирования',
                    'Лаб. работа',
                    [new Teacher(['Морозов', 'Юрий', 'Владимирович'])],
                    [new Auditorium('Пр2610', '#ffaaaa')],
                    [new Group('181-721', false)],
                    new Date(2020, 9, 14),
                    new Date(2020, 12, 3)
                )
            }
    },
        components: {
            lesson
        }
    });

    export default schedule;
</script>

<style scoped>
</style>
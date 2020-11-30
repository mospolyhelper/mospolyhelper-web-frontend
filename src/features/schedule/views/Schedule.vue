<template>
    <h1>ййй</h1>
    <p>
        Расписание занятий
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <div class="schedule">
        <button @click="update">Update</button>

        <weeklySchedule :dailySchedules="lesson"></weeklySchedule>
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Lesson from "@/domain/schedule/model/lesson"
    import Teacher from '@/domain/schedule/model/teacher';
    import Auditorium from '@/domain/schedule/model/auditorium';
    import Group from '../../../domain/schedule/model/group';
    import weeklySchedule from "@/features/schedule/components/WeeklySchedule.vue"
    import ScheduleApi from "@/data/schedule/api/scheduleApi"

    var q = new Lesson(
        1,
        'Технология кроссплатформенного программирования',
        'Лаб. работа',
        [new Teacher(['Морозов', 'Юрий', 'Владимирович'])],
        [new Auditorium('Пр2610', '#ffaaaa')],
        [new Group('181-721', false)],
        new Date(2020, 9, 14),
        new Date(2020, 12, 3)
    );
    var d = [q, q, q, q, q, q];
    var api = new ScheduleApi();
    

    const schedule = defineComponent({
        props: {
        },
        data() {
            return {
                lesson: [d, d, d, d, d, d, d]
            }
        },
        components: {
            weeklySchedule
        },
        methods: {
            update() {
                api.getSchedule().then(value => {
                    console.log("123");
                    console.log(value);
                    this.upd(value?.dailySchedules)
                });
            },
            upd(sch: Array<Array<Lesson>> | undefined) {
                if (sch) {
                    this.lesson = sch;
                }
            }
        }
    });

    

    export default schedule;
</script>

<style scoped>
</style>
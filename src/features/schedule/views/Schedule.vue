<template>
    <div class="schedule">
        <input v-model="group" />
        <button @click="update">Update</button>

        <weeklySchedule :dailySchedules="dailySchedules"></weeklySchedule>
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Lesson from "@/domain/schedule/model/lesson"
    import Teacher from '@/domain/schedule/model/teacher';
    import Auditorium from '@/domain/schedule/model/auditorium';
    import Group from '../../../domain/schedule/model/group';
    import weeklySchedule from "@/features/schedule/components/WeeklySchedule.vue";
    import ScheduleApi from "@/data/schedule/api/scheduleApi";
    import Schedule from "@/domain/schedule/model/schedule";
    import { getLessons } from "@/domain/schedule/utils/scheduleUtils"

    var api = new ScheduleApi();
    

    const schedule = defineComponent({
        props: {
        },
        data() {
            return {
                dailySchedules: [new Array<Lesson>(), [], [], [], [], [], []],
                group: ""
            }
        },
        components: {
            weeklySchedule
        },
        methods: {
            update() {
                api.getSchedule(this.group).then(value => {
                    let today = new Date();
                    let dayOfWeek = today.getDay();
                    if (dayOfWeek == 0) {
                        dayOfWeek = 7;
                    }
                    const monday = 1;
                    today.setDate(today.getDate() - (dayOfWeek - monday));
                    let dailySchedules = new Array<Array<Lesson>>();
                    for (let i = 0; i < 7; i++) {
                        dailySchedules[i] = value ? getLessons(value, today) : [];
                        today.setDate(today.getDate() + 1)
                    }
                    this.dailySchedules = dailySchedules;
                });
            }
        }
    });

    

    export default schedule;
</script>

<style scoped>
</style>
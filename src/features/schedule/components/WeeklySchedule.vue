<template>
    <div class="weeklySchedule" >
        <dailySchedule v-for="(dailySchedule, i) in getDailySchedules(dailySchedules)"
                       :date="dates[i]"
                       :dailySchedule="dailySchedule" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import dailySchedule from "@/features/schedule/components/DailySchedule.vue"


    const weeklySchedule = defineComponent({
        props: {
            dailySchedules: Array,
            dates: Array
        },
        methods: {
            getDailySchedules(dailySchedules: Array<Array<any>>) {
                if (dailySchedules[6]?.length == 0) {
                    dailySchedules.pop();
                }
                return dailySchedules;
            }
        },
        components: {
            dailySchedule
        }
    });

    export default weeklySchedule;
</script>

<style scoped>
    .weeklySchedule {
        display: flex;
    }
</style>
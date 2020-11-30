<template>
    <div class="weeklySchedule" >
        <dailySchedule v-for="dailySchedule in dailySchedules"
                       :dailySchedule="dailySchedule" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import dailySchedule from "@/features/schedule/components/DailySchedule.vue"


    const weeklySchedule = defineComponent({
        props: {
            dailySchedules: Array
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
<template>
    <div class="deadlineList">
        <deadline v-for="deadline in deadlinesList"
                  id="deadline.id"
                  :name="deadline.name"
                  :description="deadline.description"
                  :date="deadline.date.toLocaleString()"
                  :importance="deadline.importance"
                  :completed="isCompleted(deadline.completed)" />

    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import deadline from "@/features/deadlines/components/Deadline.vue"
    const deadlineList = defineComponent({
        props: {
            deadlinesList: Array
        },
        components: {
            deadline
        },
        methods: {
            isCompleted(b: boolean) {
                return deadline.completed ? "Выполнено" : "Не выполнено";
            }
        }
    });

    export default deadlineList;
</script>

<style scoped>
</style>
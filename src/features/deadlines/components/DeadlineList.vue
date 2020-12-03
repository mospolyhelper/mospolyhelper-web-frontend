<template>
    <div class="deadlineList">
        <deadline v-for="deadline in deadlinesList"
                  :name="deadline.name"
                  :description="deadline.description"
                  :date="deadline.date.toLocaleString()"
                  :importance="deadline.importance"
                  :completed="isCompleted(deadline.completed)"
                  :id="deadline.id"/>
        <button @click="showJson()">showjson</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import deadline from "@/features/deadlines/components/Deadline.vue"
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
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
            },
            showJson() {
                useCase.show();
            }
        }
    });

    export default deadlineList;
</script>

<style scoped>
</style>
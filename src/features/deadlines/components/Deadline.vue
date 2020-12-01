<template>
    <div class="deadline">
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{importance}}</div>
        <div>{{completed}}</div>
        <button @click="">Удалить</button>
        <button @click="">Редактировать</button>
        <button @click="">Закрепить</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();

    const deadline = defineComponent({
        props: {
            id: Number,
            name: String,
            description: String,
            date: String,
            importance: String,
            completed: String
        },
        methods: {
            delete() {
               // useCase.deleteDeadline(id);
            }
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
<template>
    <div class="deadline" @remove="removeFormElement">
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{importance}}</div>
        <div>{{completed}}</div>
        <button @click="removeFormElement(id)">Удалить</button>
        <button @click="">Редактировать</button>
        <button @click="pin(id)">Закрепить</button>
        <button @click="complete(id)">Выполнить</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, vShow } from "vue";
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
            pin(id: number) {
                useCase.setPinned(id);
                console.log('pinned element', id);
            },
            complete(id: number) {
                useCase.setCompleted(id);
            },
            removeFormElement(id: number) {
                console.log('sending message up to remove id', id)
                this.$emit('remove', id)
                useCase.deleteDeadline(id);
            }
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
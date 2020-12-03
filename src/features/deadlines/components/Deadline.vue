<template>
    <div class="deadline" vhide>
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{importance}}</div>
        <div>{{completed}}</div>
        <button @click="removeFormElement">Удалить</button>
        <button @click="">Редактировать</button>
        <button @click="pin">Закрепить</button>
        <button @click="complete">Выполнить</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, vShow } from "vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();

    const deadline = defineComponent({
        props: {
            name: String,
            description: String,
            date: String,
            importance: String,
            completed: String
        },
        methods: {
            pin() {
                this.$emit('setPinned');
            },
            complete() {
                this.$emit('setCompleted');
            },
            removeFormElement() {
                this.$emit('remove');
            }
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
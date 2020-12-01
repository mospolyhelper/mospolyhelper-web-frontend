<template>
    <div class="deadline" @remove="removeFormElement">
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{importance}}</div>
        <div>{{completed}}</div>
        <button @click="removeFormElement(id)">Удалить</button>
        <button @click="">Редактировать</button>
        <button @click="pin()">Закрепить</button>
        <button @click="complete()">Выполнить</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, vShow } from "vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();

    const deadline = defineComponent({
        props: {
            idd: Number,
            name: String,
            description: String,
            date: String,
            importance: String,
            completed: String
        },
        methods: {
            pin() {
                useCase.setPinned(this.$props.idd ? this.$props.idd : 0);
                //this.$props.
            },
            complete() {
                useCase.setCompleted(this.$props.idd ? this.$props.idd : 0);
                //this.completed = "Выполнено"
            },
            removeFormElement(id: number) {
                console.log('sending message up to remove id', id)
                this.$emit('remove', id)
                useCase.deleteDeadline(this.$props.idd ? this.$props.idd : 0);
            }
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
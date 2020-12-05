<template>
    <div class="deadline" vhide>
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{isImportant}}</div>
        <div>{{isCompleted}}</div>
        <div>{{isPinned}}</div>
        <button @click="removeFormElement">Удалить</button>
        <button @click="">Редактировать</button>
        <button @click="pin">Закрепить</button>
        <button @click="complete">Выполнить</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";


    const deadline = defineComponent({
        props: {
            name: String,
            description: String,
            date: String,
            importance: Number,
            completed: Boolean,
            pinned: Boolean
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
            },
        },
        computed: {
            isCompleted: function(): String {
                return this.completed ? "Выполнено" : "Не выполнено";
            },
            isPinned: function (): String {
                return this.pinned ? "Закреплено" : "Не закреплено";
            },
            isImportant: function (): String {
                switch (this.importance) {
                    case 0: return "Не важно";
                    case 1: return "Важно";
                    case 2: return "Очень важно";
                    default: return "";
                }
            }
            //,
            //showDate: function (): String {
            //    return this.date != undefined ? this.date.toLocaleString() : ""
            //}
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
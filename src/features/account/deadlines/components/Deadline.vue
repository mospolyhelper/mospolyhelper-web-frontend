<template>
    <div class="deadline">
        <img class="pinned" v-if="pinned" width="30" height="30" src="@/features/account/deadlines/components/pin.png" />
        <div class="title">{{name}}</div>
        <div>{{description}}</div>
        <div class="importance">{{isImportant}}</div>
        <div class="completed">{{isCompleted}}</div> <br />
        <div class="date" >{{date}}</div>
        <button @click="removeFormElement">Удалить</button>
        <button @click="update">Редактировать</button>
        <button @click="pin">{{isPinnedBtn}}</button>
        <button @click="complete">{{isCompletedBtn}}</button>
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
        emits: ["setCompleted", 'update', 'remove', 'setPinned'],
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
            update() {
                this.$emit('update');
            },
        },
        computed: {
            isCompleted: function (): String {
                return this.completed ? "Выполнено" : "Не выполнено";
            },
            isImportant: function (): String {
                switch (this.importance) {
                    case 0: return "Не важно";
                    case 1: return "Важно";
                    case 2: return "Очень важно";
                    default: return "";
                }
            },
            isPinnedBtn: function (): String {
                return !this.pinned ? "Закрепить" : "Открепить";
            },
            isCompletedBtn: function (): String {
                return !this.completed ? "Выполнено" : "Не выполнено";
            }
        }
    });

    export default deadline;
</script>

<style scoped>
    .deadline {
        background: #fff;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        border-radius: 25px;
        min-width: 200px;
        max-width: 500px;
    }

    .importance {
        background: #d1eafd;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .completed {
        background: #fac6ac;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }

    .date {
        float: right;
        font-weight: bold;
    }

    .pinned {
        float: right;
    }

    .title {
        font-weight: bold;
    }
</style>
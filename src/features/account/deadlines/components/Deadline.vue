<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="deadline">
        <img class="pinned" v-if="pinned" width="30" height="30" src="@/features/account/deadlines/components/pin.png" />
        <div class="title">{{name}}</div>
        <div>{{description}}</div>
        <div class="importance">{{isImportant}}</div>
        <div class="completed">{{isCompleted}}</div> <br />
        <div class="date">{{date}}</div>
        <button class="btn" @click="removeFormElement"><i class="fa fa-trash"></i></button>
        <button class="btn" @click="update"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class="btn" @click="pin"><i class="fa fa-thumb-tack" aria-hidden="true"></i></button>
        <button class="btn" @click="complete"><i class="fa fa-check" aria-hidden="true"></i></button>
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

    .btn {
        background-color: DodgerBlue; /* Blue background */
        border: none; /* Remove borders */
        color: white; /* White text */
        padding: 12px 16px; /* Some padding */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
        margin:5px;
    }

        /* Darker background on mouse-over */
        .btn:hover {
            background-color: RoyalBlue;
        }
</style>
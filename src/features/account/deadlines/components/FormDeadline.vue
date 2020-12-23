<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button @click="formVisible=!formVisible">{{buttonText}}</button>
    <form class="example" @submit.prevent="send" v-show="formVisible">
        <div class="formContainer">
            <input type="text" placeholder="Какой предмет?" v-model.trim="name" /> <br />
            <input type="text" placeholder="Что нужно сделать?" v-model.trim="description" required /><br />
            <input id="dateTimePicker" type="datetime-local" @input="datestring = $event.target.value" /><br />
            <button class="btn"><i class="fa fa-plus" aria-hidden="true"></i> Добавить</button>
        </div>
        <div class="formContainer">
            <label class="container">
                Закрепить
                <input type="checkbox" v-model="pinned">
                <span class="checkmark"></span>
            </label><br />
            <label class="container">
                Не важно
                <input name="importance" type="radio" value="0" checked v-model="picked">
                <span class="radio"></span>
            </label><br />
            <label class="container">
                Важно
                <input name="importance" type="radio" value="1" v-model="picked">
                <span class="radio"></span>
            </label><br />
            <label class="container">
                Очень важно
                <input name="importance" type="radio" value="2" v-model="picked">
                <span class="radio"></span>
            </label><br />
        </div>
    </form>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/account/deadlines/model/deadline";
    import DeadlinesUseCase from "@/domain/account/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
    const FormDeadline = defineComponent({
        props: {
            d: Deadline
        },
        emits: ["update", "add"],
        data() {
            return {
                name: "",
                description: "",
                pinned: false,
                datestring: "",
                picked: 0,
                formVisible: false
            }
        },
        methods: {
            send() {
                console.log("sent", this.name, this.description, this.pinned, this.datestring)
                if (this.d?.id != -1) {
                    this.$emit('update', new Deadline(this.name, this.description, this.pinned, (this.datestring.length == 0 ? this.d?.date : this.datestring.replace("-", ".").replace("-", ".").replace("T", ", ")), +(this.picked), this.d?.id))
                } else {
                    this.$emit('add', new Deadline(this.name, this.description, this.pinned, (this.datestring.length != 0 ? new Date(this.datestring).toLocaleString().replace(":00", "") : this.datestring.replace(":00", "")), +(this.picked)))
                    this.name = "";
                    this.description = "";
                    this.pinned = false;
                    this.picked = 0;
                }
            },
        },
        computed: {
            init: function (): String {
                if (this.d?.id != -1 && this.d != null) {
                    let d = this.d;
                    this.name = d.name;
                    this.description = d.description;
                    this.pinned = d.pinned;
                    this.picked = d.importance;
                    this.formVisible = true;
                    console.log(this.formVisible);
                    return "Обновить"
                } else {
                    this.name = "";
                    this.description = "";
                    this.pinned = false;
                    this.picked = 0;
                    return "Добавить"
                }
            },
            buttonText: function (): String {
                return this.formVisible ? "X" : "Добавить";
            }
        }
    });

    export default FormDeadline;
</script>

<style scoped>
    .btn {
        background-color: DodgerBlue; /* Blue background */
        margin-top:25px;
        border: none; /* Remove borders */
        color: white; /* White text */
        padding: 12px 16px; /* Some padding */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
    }

        /* Darker background on mouse-over */
        .btn:hover {
            background-color: RoyalBlue;
        }

    .formContainer {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
    }

    form {
        background: #fff;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        border-radius: 25px;
        max-width: 600px;
    }

        form.example input[type=text] {
            padding: 10px;
            font-size: 17px;
            border: 1px solid grey;
            min-width: 300px;
            float: left;
            background: #f1f1f1;
            margin-bottom: 5px;
        }

        form.example input[type=datetime-local] {
            padding: 10px;
            font-size: 17px;
            border: 1px solid grey;
            min-width: 300px;
            float: left;
            background: #f1f1f1;
            margin-bottom: 5px;
        }

        form.example::after {
            content: "";
            clear: both;
            display: table;
        }

    .container {
        display: block;
        position: relative;
        top:0;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

        /* Hide the browser's default checkbox */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    /* Create a custom radio button */
    .radio {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .radio {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .container input:checked ~ .radio {
        background-color: #2196F3;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .radio:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked ~ .radio:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .container .radio:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }
</style>
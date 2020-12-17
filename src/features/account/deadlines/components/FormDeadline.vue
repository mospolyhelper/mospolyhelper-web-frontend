<template>
    <button @click="formVisible=!formVisible">{{buttonText}}</button>
    <form class="formDeadline" @submit.prevent="send" v-show="formVisible">
        <input type="text" placeholder="Какой предмет?" v-model.trim="name" /> <br />
        <input type="text" placeholder="Что нужно сделать?" v-model.trim="description" required /><br />
        <input type="checkbox" v-model="pinned" />Закрепить<br />
        <input id="dateTimePicker" type="datetime-local" @input="datestring = $event.target.value" /><br />
        <input name="importance" type="radio" value="0" checked v-model="picked" />Не важно<br />
        <input name="importance" type="radio" value="1" v-model="picked" />Важно<br />
        <input name="importance" type="radio" value="2" v-model="picked" />Очень важно<br />
        <button @click="">{{init}}</button>
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
    .formDeadline {
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
</style>
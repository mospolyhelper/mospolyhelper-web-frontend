<template>
    <form class="formDeadline" @submit.prevent="send">
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
    import Deadline from "../../../domain/deadlines/model/deadline";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
    const FormDeadline = defineComponent({
        data() {
            return {
                id: -1,
                name: "",
                description: "",
                pinned: false,
                datestring: "",
                picked: 0
            }
        },
        methods: {
            send() {
                console.log("sent", this.name, this.description, this.pinned, this.datestring)
                if (this.id != -1) {
                    this.$emit('update', new Deadline(this.name, this.description, this.pinned, (this.datestring.length != 0 ? new Date(this.datestring).toLocaleString() : this.datestring), +(this.picked), this.id))
                } else {
                    this.$emit('add', new Deadline(this.name, this.description, this.pinned, (this.datestring.length != 0 ? new Date(this.datestring).toLocaleString() : this.datestring), +(this.picked)))
                }
            },
        },
        computed: {
            init: function (): String {
                if (this.id != -1) {
                    console.log(this.id);
                    let d = useCase.getDeadline(this.id)
                    this.name = d.name;
                    this.description = d.description;
                    this.pinned = d.pinned;
                    this.datestring = d.date;
                    this.picked = d.importance;
                    return "Обновить"
                } else {
                    console.log(this.id);
                    this.name = "";
                    this.description = "";
                    this.pinned = false;
                    this.datestring = "";
                    this.picked = 0;
                    return "Добавить"
                }
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
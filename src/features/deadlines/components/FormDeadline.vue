<template>
    <form class="formDeadline" @submit.prevent="send">
        <input type="text" placeholder="Какой предмет?" v-model.trim="name" /> <br />
        <input type="text" placeholder="Что нужно сделать?" v-model.trim="description" required/><br />
        <input type="checkbox" v-model="pinned" />Закрепить<br />
        <input id="dateTimePicker" type="datetime-local" @input="datestring = $event.target.value"/><br />
        <input name="importance" type="radio" value="0" checked v-model="picked" />Не важно<br />
        <input name="importance" type="radio" value="1" v-model="picked" />Важно<br />
        <input name="importance" type="radio" value="2" v-model="picked" />Очень важно<br />
        <button @click="">{{init(isUpdate)}}</button>
    </form>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "../../../domain/deadlines/model/deadline";

    const FormDeadline = defineComponent({
        props: {
            isUpdate: Boolean,
            id: Number
        },
        data() {
            return {
                name: "",
                description: "",
                pinned: false,
                dateTime: new Date(),
                datestring: "",
                picked: 0
            }
        },
        methods: {
            send() {
                console.log("sent", this.name, this.description, this.pinned, this.datestring)
                if (this.isUpdate) {
                    this.$emit('update', new Deadline(this.name, this.description, this.pinned, (this.datestring.length != 0 ? new Date(this.datestring).toLocaleString() : this.datestring), +(this.picked), this.id))
                } else {
                    this.$emit('add', new Deadline(this.name, this.description, this.pinned, (this.datestring.length != 0 ? new Date(this.datestring).toLocaleString() : this.datestring), +(this.picked)))
                }
            },
            init(b: Boolean) {
                return b ? "Обновить" : "Добавить";
            }
        }
    });

    export default FormDeadline;
</script>

<style scoped>
</style>
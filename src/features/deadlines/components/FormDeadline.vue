<template>
    <form class="formDeadline" @submit.prevent="send">
        <input type="text" placeholder="Какой предмет?" v-model.trim="name" /> <br />
        <input type="text" placeholder="Что нужно сделать?" v-model.trim="description" required/><br />
        <input type="checkbox" v-model="pinned" />Закрепить<br />
        <input id="datetime" type="datetime-local" :value="dateTime" @input="dateTime = $event.target.value"/><br />
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
                picked: 0
            }
        },
        methods: {
            dateToYYYYMMDD(d: Date) {
                return d && new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
            },
            send() {
                console.log("sent", this.name, this.description, this.pinned, this.dateTime)
                if (this.isUpdate) {
                    this.$emit('update', new Deadline(this.name, this.description, this.pinned, this.dateTime, this.picked, this.$props.id))
                } else {
                    this.$emit('add', new Deadline(this.name, this.description, this.pinned, this.dateTime, this.picked))
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
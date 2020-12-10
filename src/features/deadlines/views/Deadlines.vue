<template>
    <p>
        Дедлайны
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <deadlineList :deadlinesList="deadlineArr"
                  v-on:removeFromArray="deleteElement"
                  v-on:update="setUpdated"
                  v-on:setCompleted="setCompleted"
                  v-on:setPinned="setPinned" />
    <formDeadline :id="idUpdate"
                  v-on:update="updateDeadline"
                  v-on:add="addDeadline">
    </formDeadline>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/deadlines/model/deadline";
    import deadlineList from "@/features/deadlines/components/DeadlineList.vue";
    import formDeadline from "@/features/deadlines/components/FormDeadline.vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
    //useCase.addDeadline(new Deadline(
    //    "Технология кроссплатформенного программирования1",
    //    '123',
    //    false))
    //useCase.addDeadline(new Deadline(
    //    "Технология кроссплатформенного программирования2",
    //    '123',
    //    false))

    //useCase.addDeadline(new Deadline(
    //    "Технология кроссплатформенного программирования3",
    //    '123',
    //    false))

    //useCase.addDeadline(new Deadline(
    //    "Технология кроссплатформенного программирования4",
    //    '123',
    //    false))

    //useCase.addDeadline(new Deadline(
    //    "Технология кроссплатформенного программирования5",
    //    '123',
    //    false
    //))

    const deadlines = defineComponent({
        data() {
            return {
                deadlineArr: useCase.getDeadlines(),
                idUpdate: -1
            }
        },
        components: {
            deadlineList,
            formDeadline
        },
        methods: {
            upd() {
                let d: Deadline[] = useCase.getDeadlines()
                this.deadlineArr = [];
                d.forEach(val => this.deadlineArr.push(Object.assign({}, val)));
            },
            deleteElement(id: number) {
                useCase.deleteDeadline(id)
                this.upd();

            },
            setCompleted(id: number) {
                useCase.setCompleted(id);
                this.upd();
            },
            setPinned(id: number) {
                useCase.setPinned(id);
                this.upd();
            },
            addDeadline(d: Deadline) {
                useCase.addDeadline(d);
                this.upd();
            },
            setUpdated(id: number) {
                this.idUpdate = id;
            },
            updateDeadline(d: Deadline) {
                useCase.editDeadline(d);
                this.idUpdate = -1;
                this.upd();
            },
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>

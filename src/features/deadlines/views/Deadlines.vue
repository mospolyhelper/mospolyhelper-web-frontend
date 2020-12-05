<template>
    <p>
        Дедлайны
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim="findStr" /> <br />
    <deadlineList :deadlinesList="deadlinesArray"
                  v-on:removeFromArray="deleteElement"
                  v-on:setCompleted="setCompleted"
                  v-on:setPinned="setPinned" />
    <formDeadline :isUpdate="isUpdate"
                  v-on:update="updateDeadline"
                  v-on:add="addDeadline">
    </formDeadline>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/deadlines/model/deadline";
    import deadlineList from "@/features/deadlines/components/DeadlineList.vue";
    import formDeadline from "@/features/deadlines/components/FormDeadline.vue"
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования1",
        '123',
        false))
    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования2",
        '123',
        false))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования3",
        '123',
        false))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования4",
        '123',
        false))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования5",
        '123',
        false
        ))

    const deadlines = defineComponent({
        props: {
        },
        data() {
            return {
                deadline: useCase.getDeadlines(),
                isUpdate: false,
                isUpdated: false,
                findStr: ""
            }
        },
        components: {
            deadlineList,
            formDeadline
        },
        methods: {
            upd(d: Deadline[] = useCase.getDeadlines()) {
                this.deadline = [];
                d.forEach(val => this.deadline.push(Object.assign({}, val)));
                this.isUpdated = true;
            },
            deleteElement(id: number, i: number) {
                useCase.deleteDeadline(id)
                this.upd();

            },
            setCompleted(id: number, index: number) {
                useCase.setCompleted(id);
                this.upd();
            },
            setPinned(id: number, index: number) {
                useCase.setPinned(id);
                this.upd();
            },
            addDeadline(d: Deadline) {
                useCase.addDeadline(d);
                this.upd();
            },
            updateDeadline(d: Deadline) {
                useCase.editDeadline(d);
                this.upd();
            },
        },
        computed: {
            deadlinesArray: function (): Deadline[] {
                if (this.isUpdated) {
                    this.isUpdated = false;
                }
                if (this.findStr.length > 0) {
                    return useCase.search(this.findStr);
                } else {
                    return this.deadline
                }
            }
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>
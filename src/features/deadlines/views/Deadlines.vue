<template>
    <p>
        Дедлайны
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <input type="text" placeholder="Поиск" v-model.trim="findStr" />
    <br />
    <input type="checkbox" v-model="hideCompleted" />Скрыть выполненные
    <br />
    <deadlineList :deadlinesList="deadlinesArray"
                  v-on:removeFromArray="deleteElement"
                  v-on:update="setUpdated"
                  v-on:setCompleted="setCompleted"
                  v-on:setPinned="setPinned" />
    <button @click="formVisible=!formVisible">{{buttonText}}</button>
    <formDeadline :id="idUpdate"
                  v-if="formVisible"
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
                deadlineArr: useCase.getDeadlines(),
                formVisible: false,
                hideCompleted: false,
                idUpdate: -1,
                isUpdated: false,
                findStr: ""
            }
        },
        components: {
            deadlineList,
            formDeadline
        },
        methods: {
            upd() {
                let d: Deadline[] = useCase.getDeadlines(this.hideCompleted)
                this.deadlineArr = [];
                d.forEach(val => this.deadlineArr.push(Object.assign({}, val)));
                this.isUpdated = true;
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
                this.formVisible = !this.formVisible;
            },
            setUpdated(id: number) {
                this.idUpdate = id;

            },
            updateDeadline(d: Deadline) {
                useCase.editDeadline(d);
                this.idUpdate = -1;
                this.upd();
            },
        },
        watch: {
            hideCompleted(newHide, oldHide) {
                if (newHide !== oldHide) {
                    this.upd();
                }
            }
        },
        computed: {
            deadlinesArray: function (): Deadline[] {
                if (this.isUpdated) {
                    this.isUpdated = false;
                }
                if (this.findStr.length > 0) {
                    return useCase.search(this.findStr, this.hideCompleted);
                } else {
                    return this.deadlineArr
                }
            },
            buttonText: function (): String {
                return this.formVisible ? "X" : "Добавить";
            }
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>

<template>
    <p>
        Дедлайны
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <deadlineList :deadlinesList="deadline" 
                  v-on:removeFromArray="deleteElement"
                  v-on:setCompleted="setCompleted"
                  v-on:setPinned="setPinned"/>
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
        false,
        (new Date(1478708162000))))
    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования2",
        '123',
        false,
        new Date(1478708162000)))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования3",
        '123',
        false,
        new Date(1478708162000)))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования4",
        '123',
        false,
        new Date(1478708162000)))

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования5",
        '123',
        false,
        new Date(1478708162000)))
    
    //useCase.show();
    const deadlines = defineComponent({
        props: {
        },
        data() {
            return {
                deadline: useCase.getDeadlines(),
                isUpdate: false
            }
        },
        components: {
            deadlineList,
            formDeadline
        },
        methods: {
            update(id: number, index: number) {
                this.$data.deadline = useCase.getDeadlines();
                //console.log(this.$data.deadline.);
                this.$data.deadline[index] = new Deadline(
                    "Технология кроссплатформенного программирования1",
                    '123',
                    false);

            },
            deleteElement(id: number, i: number) {
                useCase.deleteDeadline(id)
                
                const index = this.$data.deadline.indexOf(this.$data.deadline[i], 0);
                if (index > -1) {
                    this.$data.deadline.splice(index, 1);
                }

            },
            setCompleted(id: number, index: number) {
                useCase.setCompleted(id);
                this.update(id, index);
                this.deadline[index].completed = !this.$data.deadline[index].completed
            },
            setPinned(id: number, index: number) {
                useCase.setPinned(id);
                this.deadline[index].pinned = !this.$data.deadline[index].pinned
            },
            addDeadline(d: Deadline) {
                useCase.addDeadline(d);
            },
            updateDeadline(d: Deadline) {
                useCase.editDeadline(d);

            }
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>
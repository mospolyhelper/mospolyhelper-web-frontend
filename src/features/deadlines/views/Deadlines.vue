<template>
    <p>
        Дедлайны
        <a href="https://vuejs.org" target="_blank">Vue.js</a> and
        <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.
    </p>
    <deadlineList :deadlinesList="deadline">

    </deadlineList>
    <!--<form class="addDeadline">
    </form>-->

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/deadlines/model/deadline";
    import deadlineList from "@/features/deadlines/components/DeadlineList.vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();
    let d = new Deadline(
        "Технология кроссплатформенного программирования",
        '123',
        true,
        new Date(1478708162000));
    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования",
        '123',
        true,
        new Date(1478708162000)))
    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования",
        '123',
        true,
        new Date(1478708162000)))

    useCase.show();
    const deadlines = defineComponent({
        props: {
        },
        data() {
            return {
                deadline: useCase.getDeadlines()
            }
        },
        components: {
            deadlineList
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>
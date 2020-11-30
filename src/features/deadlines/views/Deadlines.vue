<template>
    <div class="deadlines">
    </div>
    <deadline :name="deadline.name"
            :description="deadline.description"
            :date="deadline.date"
            :time="deadline.time"
            :importance="1"
            :completed="123"></deadline>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/deadlines/model/deadline";
    import deadline from "@/features/deadlines/components/Deadline.vue";
    import DeadlinesUseCase from "@/domain/deadlines/usecase/deadlinesUseCase";
    //import DeadlinesRepository from "@/domain/deadlines/repository/deadlinesRepository"

    let useCase = new DeadlinesUseCase();

    useCase.addDeadline(new Deadline(
        "Технология кроссплатформенного программирования",
        '123',
        true,
        "дата",
        "время"
    ))

    useCase.show();
    const deadlines = defineComponent({
        props: {
        },
        data() {
            return {
                deadline: new Deadline(
                    "Технология кроссплатформенного программирования",
                    '123',
                    true,
                    "дата",
                    "время"
                )
            }
        },
        components: {
            deadline
        }
    });

    export default deadlines;
</script>

<style scoped>
</style>
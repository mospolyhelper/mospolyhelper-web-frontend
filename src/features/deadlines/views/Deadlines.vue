<template>
    <div class="deadlines">
        <h1>{{ msg }}</h1>
    </div>
    <deadline :name="deadlines.name"
            :description="deadlines.description"
            :date="deadlines.date"
            :time="deadlines.time"
            :importance="1"
            :completed="123"></deadline>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/deadlines/model/deadline";
    import deadline from "@/features/deadlines/components/Deadline.vue"

    const deadlines = defineComponent({
        props: {
            msg: String
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
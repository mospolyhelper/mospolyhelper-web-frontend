<template>
    <div class="deadlineList">
        <deadline v-for="(deadline, index) in deadlinesList"
                  v-on:remove="removeFromList(deadline.id, index)"
                  v-on:setCompleted="setCompleted(deadline.id, index)"
                  v-on:setPinned="setPinned(deadline.id, index)"
                  :name="deadline.name"
                  :description="deadline.description"
                  :date="deadline.date.toLocaleString()"
                  :importance="deadline.importance"
                  :completed="isCompleted(deadline.completed)"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import deadline from "@/features/deadlines/components/Deadline.vue"

    const deadlineList = defineComponent({
        props: {
            deadlinesList: Array
        },
        components: {
            deadline
        },
        methods: {
            isCompleted(b: boolean) {
                return deadline.completed ? "Выполнено" : "Не выполнено";
            },
            removeFromList(id: number, index: number) {
                this.$emit('removeFromArray', id, index);
            },
            setCompleted(id: number, index: number) {
                this.$emit('setCompleted', id, index);
            },
            setPinned(id: number, index: number) {
                this.$emit('setPinned', id, index);
            }
        }
    });

    export default deadlineList;
</script>

<style scoped>
</style>
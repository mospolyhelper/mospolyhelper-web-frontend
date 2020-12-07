<template>
    <div class="deadlineList">
        <deadline v-for="(deadline, index) in deadlinesList"
                  v-bind:key="deadline.id"
                  v-on:remove="removeFromList(deadline.id)"
                  v-on:update="update(deadline.id)"
                  v-on:setCompleted="setCompleted(deadline.id)"
                  v-on:setPinned="setPinned(deadline.id)"
                  :name="deadline.name"
                  :description="deadline.description"
                  :date="deadline.date"
                  :importance="deadline.importance"
                  :completed="deadline.completed"
                  :pinned="deadline.pinned" />
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
            removeFromList(id: number) {
                this.$emit('removeFromArray', id);
            },
            update(id: number) {
                this.$emit('update', id);
            },
            setCompleted(id: number) {
                this.$emit('setCompleted', id);
            },
            setPinned(id: number) {
                this.$emit('setPinned', id);
            }

        }
    });

    export default deadlineList;
</script>

<style scoped>
</style>
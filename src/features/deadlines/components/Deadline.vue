<template>
    <div class="deadline">
        <div>{{name}}</div>
        <div>{{description}}</div>
        <div>{{date}}</div>
        <div>{{time}}</div>
        <div>{{importance}}</div>
        <div>{{completed}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const deadline = defineComponent({
        props: {
            name: String,
            description: String,
            date: String,
            time: String,
            importance: String,
            completed: String
        }
    });

    export default deadline;
</script>

<style scoped>
</style>
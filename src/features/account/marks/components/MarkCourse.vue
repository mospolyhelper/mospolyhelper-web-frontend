<template>
    <div>
        <div>{{course}}</div>
        <markSemestr v-for="(value, key) in semesters"
                       :searchList="key"
                       :number="value" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markSemestr from "@/features/account/marks/components/MarkSemestr.vue"

    const searchList = defineComponent({
        props: {
            semesters: Map,
            course: String
        },
        components: {
            markSemestr
        },
        methods: {

        },
        computed: {

        }
    });

    export default searchList
</script>

<style scoped>
</style>
<template>
    <div class="searchList">
        <div>{{number}}</div>
        <markElement v-for="(element, index) in searchList"
                       :name="element.subject"
                       :avatarUrl="element.loadType"
                       :status="element.mark" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markElement from "@/features/account/marks/components/MarkElement.vue"

    const searchList = defineComponent({
        props: {
            searchList: Array,
            number: String
        },
        components: {
            markElement
        },
        methods: {

        }
    });

    export default searchList;
</script>

<style scoped>
</style>
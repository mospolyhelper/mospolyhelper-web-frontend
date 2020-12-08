<template>
    <div class="searchList">
        <searchElement v-for="(element, index) in searchList"
                       v-bind:key="element.id"
                       :name="element.name"
                       :group="element.group"
                       :direction="element.direction"
                       :specialization="element.specialization"
                       :course="element.course"
                       :educationForm="element.educationForm"
                   />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchElement from "@/features/search/components/SearchElement.vue"

    const searchList = defineComponent({
        props: {
            searchList: Array
        },
        components: {
            searchElement
        },
        methods: {

        }
    });

    export default searchList;
</script>

<style scoped>
</style>
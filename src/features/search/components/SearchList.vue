<template>
    <div class="searchList">
        <searchElement v-for="(element, index) in searchList"
                  :name="123" />
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
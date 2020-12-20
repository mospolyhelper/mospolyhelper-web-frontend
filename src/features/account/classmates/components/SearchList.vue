<template>
    <div class="searchList">
        <searchElement v-for="(element, index) in searchList"
                       v-bind:key="element.id"
                       :name="element.name"
                       :avatarUrl="element.avatarUrl"
                       :status="element.status"
                       :dialogKey="element.dialogKey"/>
        <loadingAnim :showing="isLoading" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import searchElement from "@/features/account/classmates/components/SearchElement.vue";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue"

    const searchList = defineComponent({
        props: {
            searchList: Array,
            isLoading: Boolean
        },
        components: {
            searchElement,
            loadingAnim
        },
        methods: {

        }
    });

    export default searchList;
</script>

<style scoped>
    
</style>
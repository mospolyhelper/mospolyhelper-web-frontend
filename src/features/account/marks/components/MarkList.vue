<template>
    <div class="searchList">
        <markCourse v-for="(value, index) in list"
                       :course="index"
                       :semesters="value"/>
        <loadingAnim :showing="isLoading" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markCourse from "@/features/account/marks/components/MarkCourse.vue";
    import Predmet from "../../../../domain/account/marks/model/predmet";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue";

    const searchList = defineComponent({
        props: {
            courses: Object,
            isLoading: Boolean
        },
        components: {
            markCourse,
            loadingAnim
        },
        methods: {

        },
        computed: {
            list: function (): Map<string, Map<string, Array<Predmet>>> {
                console.log("course", this.courses);
                return this.courses as Map<string, Map<string, Array<Predmet>>>;
        }
    }

    });

    export default searchList;
</script>

<style scoped>
    
</style>
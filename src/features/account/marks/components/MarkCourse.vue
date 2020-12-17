<template>
    <div>
        <div class="course">{{course}} курс</div>
        <markSemestr v-for="(value, index) in list"
                       :searchList="value"
                       :number="index" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markSemestr from "@/features/account/marks/components/MarkSemestr.vue";
    import Predmet from "../../../../domain/account/marks/model/predmet";

    const searchList = defineComponent({
        props: {
            semesters: Object,
            course: String
        },
        components: {
            markSemestr
        },
        methods: {

        },
        computed: {
            list: function (): Map<string, Array<Predmet>> {
                console.log("semesters", this.semesters as Map<string, Array<Predmet>>)
                return this.semesters as Map<string, Array<Predmet>>
            }
        }
    });

    export default searchList
</script>

<style scoped>
    .course {
        background: #d1eafd;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        display: inline-block;
    }
</style>
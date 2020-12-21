<template>
    <div class="searchList">
        <div class="semester">{{number}} семестр</div>
        <markElement v-for="element in list"
                       :subject="element.subject"
                       :loadType="element.loadType"
                       :mark="element.mark" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import markElement from "@/features/account/marks/components/MarkElement.vue"
    import Predmet from "../../../../domain/account/marks/model/predmet";

    const searchList = defineComponent({
        props: {
            searchList: Object,
            number: String
        },
        components: {
            markElement
        },
        methods: {

        },
        computed: {
            list: function (): Array<Predmet> {
                console.log("predmetList", this.searchList)
                return this.searchList as Array<Predmet>
            }
        }
    });

    export default searchList;
</script>

<style scoped>
    .searchList {
        display: inline-block;
        vertical-align: top;
    }

    .semester {
        background: #66CDAA;
        color: #4985a3;
        margin-top: 4px;
        margin-bottom: 4px;
        margin-right: 2px;
        padding: 6px;
        border-radius: 10px;
        text-align:center;
    }

</style>
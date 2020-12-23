<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button class="btn" @click="toClipboard(numeratedStudentsNames)"><i class="fa fa-clone" aria-hidden="true"></i> Копировать в буфер обмена</button>
    <div class="searchList">
        <searchElement v-for="(element, index) in searchList"
                       v-bind:key="element.id"
                       :name="element.name"
                       :group="element.group"
                       :direction="element.direction"
                       :specialization="element.specialization"
                       :course="element.course"
                       :educationForm="element.educationForm" />
        <loadingAnim :showing="isLoading" />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    import searchElement from "@/features/search/components/SearchElement.vue";
    import SearchEntity from "../../../domain/search/model/SearchEntity";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue";

    const searchList = defineComponent({
        setup() {
            return { toClipboard }
        },
        props: {
            searchList: Array,
            isLoading: Boolean
        },
        components: {
            searchElement,
            loadingAnim
        },
        computed: {
            numeratedStudentsNames: function (): string {
                let searchList = this.searchList as Array<SearchEntity>;
                let names = "";
                for (let i = 0; i < searchList.length; i++) {
                    names += `${i + 1}. ${searchList[i].name}\n`;
                }
                console.log(names);
                return names;
            }
        }
    });

    export default searchList;
</script>

<style scoped>
    .searchList {
        
    }

    .btn {
        background-color: DodgerBlue; /* Blue background */
        border: none; /* Remove borders */
        color: white; /* White text */
        padding: 12px 16px; /* Some padding */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
        display:inline-block;
        float:right;
    }

        /* Darker background on mouse-over */
        .btn:hover {
            background-color: RoyalBlue;
        }
</style>
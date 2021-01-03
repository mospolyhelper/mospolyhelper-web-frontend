<template>
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
    import { defineComponent, getCurrentInstance } from "vue";
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    import searchElement from "@/features/search/components/SearchElement.vue";
    import SearchEntity from "../../../domain/search/model/SearchEntity";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue";

    const searchList = defineComponent({
        setup() {
            return { toClipboard }
        },
        data() {
            return {
                emitter: getCurrentInstance()?.appContext.config.globalProperties.emitter
            }
        },
        props: {
            searchList: Array,
            isLoading: Boolean
        },
        emits: ['copy'],
        components: {
            searchElement,
            loadingAnim
        },
        mounted() {
            this.emitter.on("copy", () => {
                toClipboard(this.numeratedStudentsNames);
            });
        },
        methods: {
            copy() {
                this.$emit('copy', this.numeratedStudentsNames)
            }
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
        display:block;
        float:left;
    }

        /* Darker background on mouse-over */
        .btn:hover {
            background-color: RoyalBlue;
        }
</style>
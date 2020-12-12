<template>
    <div>{{checkedStrings}}</div>
    <div class="selector">
        <div v-for="str in originalArray">
            <input type="checkbox" :id="str" :value="str" v-model="checkedStrings" />
            <label :for="str">
                {{
str
                }}
            </label>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const arraySelector = defineComponent({
        props: {
            originalArray: Array
        },
        data() {
            return {
                checkedStrings: new Array<string>()
            }
        },
        emits: ['arrayChanged'],
        watch: {
            checkedStrings(newValue, oldValue) {
                this.$emit('arrayChanged', newValue);
            }
        }
    });

    export default arraySelector;
</script>

<style scoped>
    .selector {
        height: 400px;
        width: 400px;
        overflow: scroll;
    }
</style>
<template>
    <div class="outer">
        <input v-model="filter" type="text" placeholder="Фильтр" />
        <button @click="clear">Очистить</button>
        <button @click="selectAll">Выбрать все</button>
        <div class="selector">
            <div v-for="str in filteredArray">
                <label>
                    <input type="checkbox" :id="str" :value="str" v-model="checkedStrings" />{{str}}
                </label>
            </div>
        </div>
        <div v-if="checkedStrings.length">{{checkedStrings.join(', ')}}</div>
        <div v-else>Все</div>
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
                checkedStrings: new Array<string>(),
                filteredArray: this.originalArray,
                filter: ''
            }
        },
        methods: {
            clear() {
                this.checkedStrings.length = 0;
            },
            selectAll() {
                this.checkedStrings = this.checkedStrings.concat(this.filteredArray as Array<string>);
            }
        },
        emits: ['arrayChanged'],
        watch: {
            checkedStrings(newValue, oldValue) {
                this.$emit('arrayChanged', newValue);
            },
            filter(newValue, oldValue) {
                this.filteredArray = this.originalArray?.filter(it => (it as string).includes(newValue));
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
    .outer {
        display: inline-block;
        max-width: 400px;
        vertical-align: top;
    }
</style>
<template>
    <input type="text" placeholder="Поиск" v-model.trim="findStr" />
    <br />
    <input type="checkbox" v-model="hideCompleted" />Скрыть выполненные
    <br />
    <button @click="save()" v-if="isChanged">Сохранить</button>
    <div v-if="list.length==0 && !isLoading && !isSaving">Дедлайнов нет:(</div>
    <div class="deadlineList">
        <deadline v-for="(deadline, index) in list"
                  v-bind:key="deadline.id"
                  v-on:remove="removeFromList(deadline.id)"
                  v-on:update="update(deadline.id)"
                  v-on:setCompleted="setCompleted(deadline.id)"
                  v-on:setPinned="setPinned(deadline.id)"
                  :name="deadline.name"
                  :description="deadline.description"
                  :date="deadline.date"
                  :importance="deadline.importance"
                  :completed="deadline.completed"
                  :pinned="deadline.pinned" />
        <div class="text"><loadingAnim :showing="textLoading != ''" />{{textLoading}}</div>
        
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import deadline from "@/features/account/deadlines/components/Deadline.vue"
    import Deadline from "@/domain/account/deadlines/model/deadline";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue"

    const deadlineList = defineComponent({
        props: {
            deadlinesList: Array,
            isLoading: Boolean,
            isSaving: Boolean,
            isChanged: Boolean
        },
        emits: ["removeFromArray", "setCompleted", 'update', 'save', 'setPinned'],
        data() {
            return {
                hideCompleted: false,
                findStr: ""
            }
        },
        components: {
            deadline,
            loadingAnim
        },
        methods: {
            removeFromList(id: number) {
                this.$emit('removeFromArray', id);
            },
            update(id: number) {
                this.$emit('update', id);
            },
            setCompleted(id: number) {
                this.$emit('setCompleted', id);
            },
            setPinned(id: number) {
                this.$emit('setPinned', id);
            },
            save() {
                this.$emit('save');
            }
        },
        computed: {
            list: function (): Array<Deadline> {
                if (this.deadlinesList == undefined) return Array<Deadline>();
                let find = this.findStr.toLocaleLowerCase();
                let hideC = this.hideCompleted;
                let arr = this.deadlinesList.filter(function (val) {
                    if (!(val as Deadline).name.toLocaleLowerCase().includes(find)) {
                        return false;
                    } else if (hideC) {
                        return !(val as Deadline).completed;
                    } else return true;
                }) as Array<Deadline>
                if (!hideC) {
                    arr.sort(function (val1, val2): number {
                        if ((val1 as Deadline).completed < (val2 as Deadline).completed) {
                            return -1
                        }
                        if ((val1 as Deadline).completed > (val2 as Deadline).completed) {
                            return 1
                        }
                        return 0
                    })
                }
                arr.sort(function (val1, val2): number {
                    if ((val2 as Deadline).pinned < (val1 as Deadline).pinned) {
                        return -1
                    }
                    if ((val2 as Deadline).pinned > (val1 as Deadline).pinned) {
                        return 1
                    }
                    return 0
                })
                return arr;
            },
            textLoading: function (): string {
                if (this.isLoading) {
                    return "Загрузка данных";
                } else if (this.isSaving) {
                    return "Сохранение данных";
                } else return "";
            }
        }
    });

    export default deadlineList;
</script>

<style scoped>

    #text {
        display: inline-block;
        vertical-align: middle;
    }

</style>
<template>
    <form class="example" @submit.prevent="">
        <input type="text" placeholder="Поиск" v-model.trim="findStr">
    </form>
    <br />
    <label class="container">
        Скрыть выполненные
        <input type="checkbox" v-model="hideCompleted">
        <span class="checkmark"></span>
    </label>
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
        <loadingAnim :showing="textLoading != ''" />

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

    .example {
        text-align: right;
    }

    form.example input[type=text] {
        padding: 10px;
        font-size: 17px;
        border: 1px solid grey;
        min-width: 300px;
        float: left;
        background: #f1f1f1;
    }

    form.example::after {
        content: "";
        clear: both;
        display: table;
    }

    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

        /* Hide the browser's default checkbox */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

</style>
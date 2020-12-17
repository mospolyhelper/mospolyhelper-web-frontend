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
        <div class="text">{{textLoading}}</div>
        <div id="circularG" v-show="isLoading || isSaving">
            <div id="circularG_1" class="circularG"></div>
            <div id="circularG_2" class="circularG"></div>
            <div id="circularG_3" class="circularG"></div>
            <div id="circularG_4" class="circularG"></div>
            <div id="circularG_5" class="circularG"></div>
            <div id="circularG_6" class="circularG"></div>
            <div id="circularG_7" class="circularG"></div>
            <div id="circularG_8" class="circularG"></div>
        </div>
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import deadline from "@/features/account/deadlines/components/Deadline.vue"
    import Deadline from "@/domain/account/deadlines/model/deadline";

    const deadlineList = defineComponent({
        props: {
            deadlinesList: Array,
            isLoading: Boolean,
            isSaving: Boolean,
            isChanged: Boolean
        },
        data() {
            return {
                hideCompleted: false,
                findStr: ""
            }
        },
        components: {
            deadline
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
        display:inline-block
    }

    #circularG {
        position: relative;
        width: 28px;
        height: 28px;
        margin:inherit;
    }
    

    .circularG {
        position: absolute;
        background-color: rgb(0,0,0);
        width: 7px;
        height: 7px;
        border-radius: 4px;
        -o-border-radius: 4px;
        -ms-border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        animation-name: bounce_circularG;
        -o-animation-name: bounce_circularG;
        -ms-animation-name: bounce_circularG;
        -webkit-animation-name: bounce_circularG;
        -moz-animation-name: bounce_circularG;
        animation-duration: 1.1s;
        -o-animation-duration: 1.1s;
        -ms-animation-duration: 1.1s;
        -webkit-animation-duration: 1.1s;
        -moz-animation-duration: 1.1s;
        animation-iteration-count: infinite;
        -o-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-direction: normal;
        -o-animation-direction: normal;
        -ms-animation-direction: normal;
        -webkit-animation-direction: normal;
        -moz-animation-direction: normal;
    }

    #circularG_1 {
        left: 0;
        top: 11px;
        animation-delay: 0.41s;
        -o-animation-delay: 0.41s;
        -ms-animation-delay: 0.41s;
        -webkit-animation-delay: 0.41s;
        -moz-animation-delay: 0.41s;
    }

    #circularG_2 {
        left: 3px;
        top: 3px;
        animation-delay: 0.55s;
        -o-animation-delay: 0.55s;
        -ms-animation-delay: 0.55s;
        -webkit-animation-delay: 0.55s;
        -moz-animation-delay: 0.55s;
    }

    #circularG_3 {
        top: 0;
        left: 11px;
        animation-delay: 0.69s;
        -o-animation-delay: 0.69s;
        -ms-animation-delay: 0.69s;
        -webkit-animation-delay: 0.69s;
        -moz-animation-delay: 0.69s;
    }

    #circularG_4 {
        right: 3px;
        top: 3px;
        animation-delay: 0.83s;
        -o-animation-delay: 0.83s;
        -ms-animation-delay: 0.83s;
        -webkit-animation-delay: 0.83s;
        -moz-animation-delay: 0.83s;
    }

    #circularG_5 {
        right: 0;
        top: 11px;
        animation-delay: 0.97s;
        -o-animation-delay: 0.97s;
        -ms-animation-delay: 0.97s;
        -webkit-animation-delay: 0.97s;
        -moz-animation-delay: 0.97s;
    }

    #circularG_6 {
        right: 3px;
        bottom: 3px;
        animation-delay: 1.1s;
        -o-animation-delay: 1.1s;
        -ms-animation-delay: 1.1s;
        -webkit-animation-delay: 1.1s;
        -moz-animation-delay: 1.1s;
    }

    #circularG_7 {
        left: 11px;
        bottom: 0;
        animation-delay: 1.24s;
        -o-animation-delay: 1.24s;
        -ms-animation-delay: 1.24s;
        -webkit-animation-delay: 1.24s;
        -moz-animation-delay: 1.24s;
    }

    #circularG_8 {
        left: 3px;
        bottom: 3px;
        animation-delay: 1.38s;
        -o-animation-delay: 1.38s;
        -ms-animation-delay: 1.38s;
        -webkit-animation-delay: 1.38s;
        -moz-animation-delay: 1.38s;
    }



    @keyframes bounce_circularG {
        0% {
            transform: scale(1);
        }

        100% {
            transform: scale(.3);
        }
    }

    @-o-keyframes bounce_circularG {
        0% {
            -o-transform: scale(1);
        }

        100% {
            -o-transform: scale(.3);
        }
    }

    @-ms-keyframes bounce_circularG {
        0% {
            -ms-transform: scale(1);
        }

        100% {
            -ms-transform: scale(.3);
        }
    }

    @-webkit-keyframes bounce_circularG {
        0% {
            -webkit-transform: scale(1);
        }

        100% {
            -webkit-transform: scale(.3);
        }
    }

    @-moz-keyframes bounce_circularG {
        0% {
            -moz-transform: scale(1);
        }

        100% {
            -moz-transform: scale(.3);
        }
    }
</style>
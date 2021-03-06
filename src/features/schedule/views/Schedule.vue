<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="schedule">
        <div class="search">
            <input v-model="group" type="text" placeholder="Номер группы" />
            <button class="searchBtn" @click="download"><i class="fa fa-search"></i></button>
        </div>
        <input type="file" @change="openScheduleFromFile"/>
        <br />
        <br />
        <br />
        <div class="filters">
            Фильтр по дате:<br />
            <label><input type="checkbox" v-model="showEnded" />Закончившиеся</label><br />
            <label><input type="checkbox" v-model="showCurrent" />Текущие</label><br />
            <label><input type="checkbox" v-model="showNotStarted" />Неначавшиеся</label>
        </div>
        <div class="datesOuter">
            <div class="dates">
                <a class="prev" @click="setPreviousWeek">&#10094;</a>
                <div class="dateText">Неделя {{getFormattedDate(dates[0])}} - {{getFormattedDate(dates[6])}}</div>
                <a class="next" @click="setNextWeek">&#10095;</a>
            </div>
        </div>

        <weeklySchedule :dailySchedules="dailySchedules"
                        :dates="dates"></weeklySchedule>
        <loadingAnim :showing="isLoading" />
        <button @click="advancedInit" class="searchBtn" style="margin:10px">Продвинутый поиск</button>
        <br />
        <br />
        <br />
        <div v-show="advancedSearchVisible">
            <p class="advancedSearchTitle">Продвинутый поиск</p>
            <loadingAnim :showing="loadingAdvanced" />
            <arraySelector v-if="groupList?.length" :originalArray="groupList" @arrayChanged="groupListChanged" />
            <arraySelector v-if="teacherList?.length" :originalArray="teacherList" @arrayChanged="teacherListChanged" />
            <arraySelector v-if="auditoriumList?.length" :originalArray="auditoriumList" @arrayChanged="auditoriumListChanged" />
            <arraySelector v-if="titleList?.length" :originalArray="titleList" @arrayChanged="titleListChanged" />
            <arraySelector v-if="typeList?.length" :originalArray="typeList" @arrayChanged="typeListChanged" />
            <button v-if="groupList?.length || teacherList?.length || auditoriumList?.length || titleList?.length || typeList?.length"
                    class="searchBtn" @click="advancedSearch">
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Lesson from "@/domain/schedule/model/lesson"
    import Teacher from '@/domain/schedule/model/teacher';
    import Auditorium from '@/domain/schedule/model/auditorium';
    import Group from '../../../domain/schedule/model/group';
    import weeklySchedule from "@/features/schedule/components/WeeklySchedule.vue";
    import arraySelector from "@/features/schedule/components/ArraySelector.vue";
    import ScheduleUseCase from "@/domain/schedule/usecase/scheduleUseCase";
    import Schedule from "@/domain/schedule/model/schedule";
    import { getLessons } from "@/domain/schedule/utils/scheduleUtils"
    import * as moment from 'moment';
    import 'moment/locale/ru';
    import fs from 'fs';
    import loadingAnim from "@/features/common/components/lodingAnimation.vue";

    moment.locale('ru');

    const useCase = new ScheduleUseCase();
    

    const schedule = defineComponent({
        props: {
        },
        data() {
            return {
                dailySchedules: [new Array<Lesson>(), [], [], [], [], [], []],
                group: "",
                showEnded: false,
                showCurrent: true,
                showNotStarted: false,
                dates: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
                schedule: null as (Schedule | null),
                groupList: new Array<string>(),
                teacherList: new Array<string>(),
                auditoriumList: new Array<string>(),
                titleList: new Array<string>(),
                typeList: new Array<string>(),
                checkedGroupList: new Array<string>(),
                checkedTeacherList: new Array<string>(),
                checkedAuditoriumList: new Array<string>(),
                checkedTitleList: new Array<string>(),
                checkedTypeList: new Array<string>(),
                isLoading: false,
                advancedSearchVisible: false
            }
        },
        watch: {
            showEnded(newValue, oldValue) {
                this.update();
            },
            showCurrent(newValue, oldValue) {
                this.update();
            },
            showNotStarted(newValue, oldValue) {
                this.update();
            },
            schedule(newValue, oldValue) {
                this.update();
            }
        },
        components: {
            weeklySchedule,
            arraySelector,
            loadingAnim
        },
        methods: {
            openScheduleFromFile(event: any) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    var target: any = e.target;
                    var data = target.result;
                    var schedule = JSON.parse(data) as Schedule;
                    schedule.dateFrom = new Date(Date.parse(schedule.dateFrom as any));
                    schedule.dateTo = new Date(Date.parse(schedule.dateTo as any));
                    schedule.dailySchedules.forEach(dailySchedule => {
                        dailySchedule.forEach(lesson => {
                            lesson.dateFrom = new Date(Date.parse(lesson.dateFrom as any));
                            lesson.dateTo = new Date(Date.parse(lesson.dateTo as any));
                        });
                    });

                    console.log(schedule);
                    this.schedule = schedule;
                };
                reader.readAsText(file);
            },
            getFormattedDate(date: Date) {
                const moment = require('moment');
                return moment(date).format('D MMMM');
            },
            download() {
                this.isLoading = true;
                useCase.getScheduleByGroup(this.group).then(value => {
                    this.schedule = value;
                    this.isLoading = false;
                });
            },
            advancedInit() {
                this.$data.advancedSearchVisible = !this.$data.advancedSearchVisible;
                if (this.groupList.length == 0) {
                    useCase.getGroupList().then(value => {
                        this.groupList = value;
                    });
                }
                if (this.teacherList.length == 0) {
                    useCase.getTeacherList().then(value => {
                        this.teacherList = value;
                    });
                }
                if (this.auditoriumList.length == 0) {
                    useCase.getAuditoriumList().then(value => {
                        this.auditoriumList = value;
                    });
                }
                if (this.titleList.length == 0) {
                    useCase.getTitleList().then(value => {
                        this.titleList = value;
                    });
                }
                if (this.typeList.length == 0) {
                    useCase.getTypeList().then(value => {
                        this.typeList = value;
                    });
                }
            },
            advancedSearch() {
                useCase.getSchedule(
                    this.checkedGroupList,
                    this.checkedTeacherList,
                    this.checkedAuditoriumList,
                    this.checkedTitleList,
                    this.checkedTypeList
                ).then(value => {
                    this.schedule = value;
                });
            },
            update() {
                let dailySchedules = new Array<Array<Lesson>>();
                for (let i = 0; i < 7; i++) {
                    dailySchedules[i] = this.schedule ?
                        getLessons(
                            this.schedule,
                            this.dates[i],
                            this.showEnded,
                            this.showCurrent,
                            this.showNotStarted
                        ) : [];
                }
                this.dailySchedules = dailySchedules;
            },
            setCurrentWeek() {
                let today = new Date();
                let dayOfWeek = today.getDay();
                if (dayOfWeek == 0) {
                    dayOfWeek = 7;
                }
                const monday = 1;
                today.setDate(today.getDate() - (dayOfWeek - monday));
                let dates = new Array<Date>();
                for (let i = 0; i < 7; i++) {
                    dates[i] = new Date(today);
                    today.setDate(today.getDate() + 1)
                }
                this.dates = dates;
            },
            setNextWeek() {
                for (const date of this.dates) {
                    date.setDate(date.getDate() + 7);
                }
                this.update();
            },
            setPreviousWeek() {
                for (const date of this.dates) {
                    date.setDate(date.getDate() - 7);
                }
                this.update();
            },
            groupListChanged(value: Array<string>) {
                this.checkedGroupList = value;
            },
            teacherListChanged(value: Array<string>) {
                this.checkedTeacherList = value;
            },
            auditoriumListChanged(value: Array<string>) {
                this.checkedAuditoriumList = value;
            },
            titleListChanged(value: Array<string>) {
                this.checkedTitleList = value;
            },
            typeListChanged(value: Array<string>) {
                this.checkedTypeList = value;
            }
        },
        created() {
            this.setCurrentWeek();
        },
        computed: {
            loadingAdvanced: function (): boolean {
                return this.groupList.length == 0 || this.teacherList.length == 0 || this.auditoriumList.length == 0 || this.titleList.length == 0 || this.typeList.length == 0
            }
        }
    });

    

    export default schedule;
</script>

<style scoped>
    input[type=text] {
        box-sizing: border-box;
        padding: 10px;
        font-size: 17px;
        border: 0px;
        float: left;
        width: 80%;
        background: #fff;
    }

    .searchBtn {
        box-sizing: border-box;
        float: left;
        width: 20%;
        padding: 10px;
        background: #2196F3;
        color: white;
        font-size: 17px;
        border: 0px;
        cursor: pointer;
    }

    .searchBtn:hover {
        background: #0b7dda;
    }
    .search {
        padding-top: 20px;
        box-sizing: border-box;
        margin: auto;
        max-width: 500px
    }
    .datesOuter {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dates {
        margin-top: 20px;
        display: inline-block;
        margin: auto;
    }
    .dates > * {
        display: inline-block;
    }
    .dateText {
        font-size: 20px;
    }
    /* Next & previous buttons */
    .prev, .next {
        cursor: pointer;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: #000;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
    }
    /* On smaller screens, decrease text size */
    @media only screen and (max-width: 300px) {
        .prev, .next, .text {
            font-size: 11px
        }
    }
    .advancedSearchTitle {
        font-size: 30px;
    }
</style>
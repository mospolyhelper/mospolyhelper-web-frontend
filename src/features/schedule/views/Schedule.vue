<template>
    <div class="schedule">
        <input v-model="group" />
        <button @click="download">Загрузить</button>
        Фильтр по дате: showEnded
        <input type="checkbox" v-model="showEnded" />
        showCurrent
        <input type="checkbox" v-model="showCurrent" />
        showNotStarted
        <input type="checkbox" v-model="showNotStarted" />
        <br />
        <button @click="setPreviousWeek">Предыдущая неделя</button>
        <div>Неделя {{getFormattedDate(dates[0])}} - {{getFormattedDate(dates[6])}}</div>
        <button @click="setNextWeek">Следующая неделя</button>

        <weeklySchedule :dailySchedules="dailySchedules"
                        :dates="dates"></weeklySchedule>
        <arraySelector :originalArray="groupList" @arrayChanged="groupListChanged" />
        <arraySelector :originalArray="teacherList" @arrayChanged="teacherListChanged" />
        <arraySelector :originalArray="auditoriumList" @arrayChanged="auditoriumListChanged" />
        <arraySelector :originalArray="titleList" @arrayChanged="titleListChanged" />
        <arraySelector :originalArray="typeList" @arrayChanged="typeListChanged" />
        <button @click="advancedSearch">Поиск</button>
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
                checkedTypeList: new Array<string>()
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
            arraySelector
        },
        methods: {
            getFormattedDate(date: Date) {
                const moment = require('moment');
                return moment(date).format('D MMMM');
            },
            download() {
                useCase.getScheduleByGroup(this.group).then(value => {
                    this.schedule = value;
                });
                useCase.getGroupList().then(value => {
                    this.groupList = value;
                });
                useCase.getTeacherList().then(value => {
                    this.teacherList = value;
                });
                useCase.getAuditoriumList().then(value => {
                    this.auditoriumList = value;
                });
                useCase.getTitleList().then(value => {
                    this.titleList = value;
                });
                useCase.getTypeList().then(value => {
                    this.typeList = value;
                });
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
        }
    });

    

    export default schedule;
</script>

<style scoped>
</style>
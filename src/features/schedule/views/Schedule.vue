<template>
    <div class="schedule">
        <input v-model="group" />
        <button @click="download">Загрузить</button>
        <input type="checkbox" v-model="showEnded" />
        <input type="checkbox" v-model="showCurrent" />
        <input type="checkbox" v-model="showNotStarted" />

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
                groupList: new Array<String>(),
                teacherList: new Array<String>(),
                auditoriumList: new Array<String>(),
                titleList: new Array<String>(),
                typeList: new Array<String>(),
                checkedGroupList: new Array<String>(),
                checkedTeacherList: new Array<String>(),
                checkedAuditoriumList: new Array<String>(),
                checkedTitleList: new Array<String>(),
                checkedTypeList: new Array<String>()
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
                let today = new Date();
                let dayOfWeek = today.getDay();
                if (dayOfWeek == 0) {
                    dayOfWeek = 7;
                }
                const monday = 1;
                today.setDate(today.getDate() - (dayOfWeek - monday));
                let dailySchedules = new Array<Array<Lesson>>();
                let dates = new Array<Date>();
                for (let i = 0; i < 7; i++) {
                    dates[i] = new Date(today);
                    dailySchedules[i] = this.schedule ?
                        getLessons(
                            this.schedule,
                            today,
                            this.showEnded,
                            this.showCurrent,
                            this.showNotStarted
                        ) : [];
                    today.setDate(today.getDate() + 1)
                }
                this.dailySchedules = dailySchedules;
                this.dates = dates;
            },

            groupListChanged(value: Array<String>) {
                this.checkedGroupList = value;
            },
            teacherListChanged(value: Array<String>) {
                this.checkedTeacherList = value;
            },
            auditoriumListChanged(value: Array<String>) {
                this.checkedAuditoriumList = value;
            },
            titleListChanged(value: Array<String>) {
                this.checkedTitleList = value;
            },
            typeListChanged(value: Array<String>) {
                this.checkedTypeList = value;
            }
        }
    });

    

    export default schedule;
</script>

<style scoped>
</style>
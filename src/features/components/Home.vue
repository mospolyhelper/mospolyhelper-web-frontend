<template>
    <div class="home">
        <h1>{{ msg }}</h1>
        <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.</p>
        <v-btn block @click="fun">Add to cart</v-btn>
        <button v-on:click="fun">Поприветствовать</button>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ScheduleApi from '../../data/schedule/api/scheduleApi';

    @Component
    export default class Home extends Vue {
        @Prop() private msg!: string;
        fun(): void {
            new ScheduleApi().getSchedule().then(it => console.log(it));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

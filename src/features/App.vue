<template>
    <div id="app">
        <Header ref="header"/>
        <div id="main-view"> <router-view v-on:update="auth"/></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./common/components/Header.vue";

    const App = defineComponent({
        components: {
            Header
        },
        methods: {
            auth() {
                console.log("need to call header method");
                
            }
        }
    });

export default App;
</script>

<style>
.font-weighted-bold {
    font-weight: bold;
}
    html {
        height: 100%;
        margin: 0px !important;
        padding: 0px !important;
    }
    body {
        font-family: sans-serif;
        height: 100%;
        margin: 0px !important;
        padding: 0px !important;
        background-color: #eaeef7;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto;
        background-attachment: fixed;
    }
    #main-view {
        margin-top: 60px;
    }
</style>

<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

const App = defineComponent({
    components: { Header }
});

export default App;
</script>

<style>
.font-weighted-bold {
    font-weight: bold;
}
</style>

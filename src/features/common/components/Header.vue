<template>
    <div class="nav-header">
        <HeaderLink to="/" exact>Home</HeaderLink>
        <HeaderLink to="/schedule">Schedule</HeaderLink>
        <HeaderLink to="/deadlines">Deadlines</HeaderLink>
        <HeaderLink to="/map">Map</HeaderLink>
        <HeaderLink to="/search">Search</HeaderLink>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLink from "./HeaderLink.vue";

const Header = defineComponent({
    components: {
        HeaderLink
    }
});

export default Header;
</script>

<style scoped>
.nav-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

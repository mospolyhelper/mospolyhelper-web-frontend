<template>
    <div class="nav-header">
        <HeaderLink to="/" exact>Home</HeaderLink>
        <HeaderLink to="/schedule">Schedule</HeaderLink>
        <HeaderLink to="/deadlines">Deadlines</HeaderLink>
        <HeaderLink to="/map">Map</HeaderLink>
        <HeaderLink to="/search">Search</HeaderLink>
        <div class="dropdown">
            <button class="dropbtn">Account</button>
            <div class="dropdown-content">
                <HeaderLink to="/account/auth">Auth</HeaderLink>
                <HeaderLink to="/account/teachersSearch">Teachers Search</HeaderLink>
                <HeaderLink to="/account/classmates">Classmates</HeaderLink>
            </div>
        </div>
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
    /* Dropdown Button */
    .dropbtn {
        background-color: #4CAF50;
        color: white;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 16px;
        border: none;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

        /* Links inside the dropdown */
        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }

            /* Change color of dropdown links on hover */
            .dropdown-content a:hover {
                background-color: #ddd;
            }

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {
        background-color: #3e8e41;
    } 
</style>

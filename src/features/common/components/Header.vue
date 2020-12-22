<template>
    <div class="navbar-outer" id="navbar-outer">
        <div class="navbar">
            <HeaderLink to="/" exact>Главная</HeaderLink>
            <HeaderLink to="/schedule">Расписание</HeaderLink>
            <HeaderLink to="/map">Map</HeaderLink>
            <HeaderLink to="/search">Поиск студентов</HeaderLink>
            <div class="dropdown">
                <button class="dropbtn">Аккаунт</button>
                <div class="dropdown-content">
                    <HeaderLink to="/account/auth">Авторизация</HeaderLink>
                    <HeaderLink to="/account/info">Info</HeaderLink>
                    <HeaderLink to="/account/deadlines">Дедлайны</HeaderLink>
                    <HeaderLink to="/account/teachersSearch">Поиск преподавателей</HeaderLink>
                    <HeaderLink to="/account/classmates">Одногруппники</HeaderLink>
                    <HeaderLink to="/account/marks">Оценки</HeaderLink>
                </div>
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
    .navbar-outer {
        background-color: #fff;
    }
    .navbar {
        display: table;
        margin: 0 auto;
        overflow: hidden;
    }
    /* The dropdown container */
    .dropdown {
        float: left;
        overflow: hidden;
    }

        /* Dropdown button */
        .dropdown .dropbtn {
            font-size: 20px;
            border: none;
            outline: none;
            color: #918b8f;
            padding: 14px 16px;
            background-color: inherit;
            font-family: inherit; /* Important for vertical align on mobile phones */
            margin: 0; /* Important for vertical align on mobile phones */
        }

    /* Dropdown content (hidden by default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
        /* Links inside the dropdown */
        .dropdown-content div {
            float: none;
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }

            /* Add a grey background color to dropdown links on hover */
            .dropdown-content div:hover {
                background-color: #ddd;
            }
    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }
    /* Add a red background color to navbar links on hover */
    .navbar .dropdown:hover .dropbtn {
        background-color: #cbedff;
    }

    #navbar-outer {
        background-color: #333;
        position: fixed; /* Set the navbar to fixed position */
        top: 0; /* Position the navbar at the top of the page */
        width: 100%; /* Full width */
    }
</style>

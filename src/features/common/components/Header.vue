<template>
    <div class="navbar-outer" id="navbar-outer">
        <div class="navbar">
            <HeaderLink to="/" exact>Главная</HeaderLink>
            <HeaderLink to="/schedule">Расписание</HeaderLink>
            <HeaderLink to="/locations">Карта</HeaderLink>
            <HeaderLink to="/search">Поиск студентов</HeaderLink>
            <div class="dropdown">
                <button class="dropbtn">Аккаунт</button>
                <div class="dropdown-content">
                    <HeaderLink to="/account/auth">Авторизация</HeaderLink>
                    <HeaderLink v-show="info" to="/account/info">Info</HeaderLink>
                    <HeaderLink to="/account/deadlines">Дедлайны</HeaderLink>
                    <HeaderLink v-show="teachers" to="/account/teachersSearch">Поиск преподавателей</HeaderLink>
                    <HeaderLink v-show="classmates" to="/account/classmates">Одногруппники</HeaderLink>
                    <HeaderLink v-show="marks" to="/account/marks">Оценки</HeaderLink>
                </div>
            </div>
            <loadingAnim class="loading" :showing="isLoading" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance } from "vue";
    import HeaderLink from "./HeaderLink.vue";
    import AuthApi from "@/data/account/auth/api/authApi";
    import AuthLocalDataSource from "@/data/account/auth/local/authLocalDataSource";
    import AuthRemoteDataSource from "@/data/account/auth/remote/authRemoteDataSource";
    import AuthRepositoryImpl from "@/data/account/auth/repository/authRepository";
    import { StorageLocalDataSource } from "@/data/common/local/storageLocalDataSource";
    import PreferencesRepository from "@/data/common/repository/preferencesRepository";
    import AuthUseCase from "@/domain/account/auth/usecase/authUseCase";
    import loadingAnim from "@/features/common/components/lodingAnimation.vue";
    import router from "../router/router";

    const useCase = new AuthUseCase(
        new AuthRepositoryImpl(
            new AuthLocalDataSource(),
            new AuthRemoteDataSource(new AuthApi)
        ),
        new PreferencesRepository(
            new StorageLocalDataSource()
        )
    );

    const Header = defineComponent({
        props: {
            permission: Array
        },
        data() {
            return {
                isLoading: false,
                dialogs: false,
                info: false,
                marks: false,
                classmates: false,
                teachers: false,
                applications: false,
                myportfolio: false,
                portfolios: false,
                emitter: getCurrentInstance()?.appContext.config.globalProperties.emitter
            }
        },
        components: {
            HeaderLink,
            loadingAnim
        },
        mounted() {
            this.show();
            this.emitter.on("updateHeader", () => {
                this.show();
            });
        },
        methods: {
            show() {
                this.isLoading = true;
                let self = this;
                useCase.getPermissions().then(result => {
                    if (result.isSuccess) {
                        (result.value as Array<string>).forEach(val => {
                            switch (val) {
                                case "dialogs": self.dialogs = true;
                                    break;
                                case "info": self.info = true;
                                    break;
                                case "marks": self.marks = true;
                                    break;
                                case "classmates": self.classmates = true;
                                    break;
                                case "applications": self.applications = true;
                                    break;
                                case "myportfolio": self.myportfolio = true;
                                    break;
                                case "portfolios": self.portfolios = true;
                                    break;
                            }
                        });
                    } else if (result.isFailure) {
                        if (result.errorOrNull()?.message == "401") {
                            alert("Вы будете перенаправлены на страницу авторизации.");
                            router.push('/account/auth')
                        }
                    }
                    this.isLoading = false;
                })
            }
        },
        computed: {
            premissions: function():string {
                let self = this;
                this.permission?.forEach(val => {
                    switch (val) {
                        case "dialogs": self.dialogs = true;
                            break;
                        case "info": self.info = true;
                            break;
                        case "marks": self.marks = true;
                            break;
                        case "classmates": self.classmates = true;
                            break;
                        case "applications": self.applications = true;
                            break;
                        case "myportfolio": self.myportfolio = true;
                            break;
                        case "portfolios": self.portfolios = true;
                            break;
                    }
                });
                return "";
            }
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
        z-index: 2;
        background-color: #333;
        position: fixed; /* Set the navbar to fixed position */
        top: 0; /* Position the navbar at the top of the page */
        width: 100%; /* Full width */
    }

    .loading {
        display:inline-block;
    }
</style>

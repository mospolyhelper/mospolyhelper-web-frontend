<template>
    <div class="outer">
        <div class="middle">
            <div class="container">
                <input type="text" v-model="login" placeholder="Логин" />
                <input type="password" v-model="password" placeholder="Пароль" />
                <input type="checkbox" name="saveLogin" />
                <label for="saveLogin">Сохранить логин</label> <br />
                <input type="checkbox" name="savePassword" />
                <label for="savePassword">Сохранить пароль (небезопасно)</label>
                <input @click="logIn" type="submit" value="Войти">
                <div v-if="success">Успешная авторизация</div>
                <div v-else>Неправильный логин или пароль</div>
            </div>
        </div>
        </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
import AuthApi from "../../../../data/account/auth/api/authApi";
import AuthLocalDataSource from "../../../../data/account/auth/local/authLocalDataSource";
import AuthRemoteDataSource from "../../../../data/account/auth/remote/authRemoteDataSource";
import AuthRepositoryImpl from "../../../../data/account/auth/repository/authRepository";
    import AuthUseCase from "../../../../domain/account/auth/usecase/authUseCase";

    const useCase = new AuthUseCase(
        new AuthRepositoryImpl(
            new AuthLocalDataSource(),
            new AuthRemoteDataSource(new AuthApi)
        )
    );

    const auth = defineComponent({
        data() {
            return {
                login: '',
                password: '',
                success: null as boolean | null
            }
        },
        methods: {
            logIn() {
                const res = useCase.logIn(this.login, this.password);
                res.then(it => this.success = it);
            }
        }
    });

    export default auth;
</script>

<style scoped>

    * {
        box-sizing: border-box;
    }
    .outer {
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .middle {
        display: table-cell;
        vertical-align: middle;
    }

    /* style the container */
    .container {
        max-width: 500px;
        width: 50%;
        position: relative;
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px 100px 30px 100px;
        margin-left: auto;
        margin-right: auto;
    }

    /* style inputs and link buttons */
    input,
    .btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 4px;
        margin: 5px 0;
        opacity: 0.85;
        display: inline-block;
        font-size: 17px;
        line-height: 20px;
        text-decoration: none; /* remove underline from anchors */
    }
        input[type=checkbox] {
            width: auto;
            margin-right: 10px;
        }

        input:hover,
        .btn:hover {
            opacity: 1;
        }


    /* style the submit button */
    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
    }

        input[type=submit]:hover {
            background-color: #45a049;
        }

</style>
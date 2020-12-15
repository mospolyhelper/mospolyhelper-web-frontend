<template>
    <input type="text" v-model="login" />
    <br />
    <input type="password" v-model="password" />
    <br />
    <button @click="logIn">Войти</button>
    <div v-if="success != null">Результат авторизации {{success}}</div>

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
</style>
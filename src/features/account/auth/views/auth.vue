<template>
    <input type="text" v-model="login" />
    <br />
    <input type="password" v-model="password" />
    <br />
    <button @click="logIn">Ввойти</button>

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
                password: ''
            }
        },
        methods: {
            logIn() {
                useCase.logIn(this.login, this.password);
            }
        }
    });

    export default auth;
</script>

<style scoped>
</style>
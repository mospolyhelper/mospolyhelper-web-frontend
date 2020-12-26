<template>
    
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogsUseCase from "@/domain/account/dialogs/usecase/dialogsUseCase";

const useCase = new DialogsUseCase();

const DialogsList = defineComponent({
    components: {},
    setup() {

    }
});

export default DialogsList;
</script>

<style scoped>

</style>

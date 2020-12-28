<template>
    <div class="dialogs-list">
        <h2 class="heading">Личные сообщения</h2>
        <DialogPreview v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog" />
        <loader id="loader" :showing="isLoading" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import DialogsUseCase from "@/domain/account/dialogs/preview/usecase/dialogsUseCase";
import DialogPreview from "@/features/account/dialogs/components/DialogPreview.vue";
import DialogPreviewModel from "@/domain/account/dialogs/preview/model/dialogs";
import loader from "@/features/common/components/lodingAnimation.vue";

type DialogsListState = {
    dialogs: DialogPreviewModel[];
    isLoading: boolean;
};

const useCase = new DialogsUseCase();

const DialogsList = defineComponent({
    components: { DialogPreview, loader },
    setup() {
        const state = reactive<DialogsListState>({
            dialogs: [],
            isLoading: true,
        });

        useCase.getDialogs().then(res => {
            state.isLoading = false;
            if (res.isSuccess) {
                state.dialogs = res.value;
            } else if (res.isFailure) {
                const err = res.errorOrNull();
                alert(err ?? "Неизвестная ошибка");
            }
        });

        return state;
    }
});

export default DialogsList;
</script>

<style scoped>
.dialogs-list {
    width: 60%;
    margin: 6% auto;
}

.dialogs-list:hover {
    cursor: pointer;
}

.heading {
    color: cornflowerblue;
    font-size: 1.6rem;
    cursor: auto;
}

#loader {
    position: relative;
    margin-top: 30%;
}
</style>

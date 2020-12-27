<template>
    <div class="dialogs-list">
        <h2 class="heading">Личные сообщения</h2>
        <DialogPreview v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import DialogsUseCase from "@/domain/account/dialogs/preview/usecase/dialogsUseCase";
import DialogPreview from "@/features/account/dialogs/components/DialogPreview.vue";
import DialogPreviewModel from "@/domain/account/dialogs/preview/model/dialogs";

type DialogsListState = {
    dialogs: DialogPreviewModel[];
};

const useCase = new DialogsUseCase();

const DialogsList = defineComponent({
    components: { DialogPreview },
    setup() {
        const state = reactive<DialogsListState>({
            dialogs: []
        });

        useCase.getDialogs().then(res => {
            if (res.isSuccess) {
                state.dialogs = res.value;
            } else if (res.isFailure) {
                const err = res.errorOrNull();
                if (err) alert(err);
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
</style>

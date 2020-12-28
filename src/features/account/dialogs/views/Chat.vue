<template>
    <div class="chat">
        <h2 class="heading">Сообщения</h2>
        <MessageComponent v-for="msg in messages" :key="msg.id" :message="msg" />
        <loader id="loader" :showing="isLoading" />
    </div>
</template>

<script lang="ts">
import ChatUseCase from "@/domain/account/dialogs/chat/usecase/chatUseCase";
import { defineComponent, reactive } from "vue";
import Message from "@/domain/account/dialogs/chat/model/message";
import MessageComponent from "../components/Message.vue";
import loader from "@/features/common/components/lodingAnimation.vue";

type ChatState = {
    messages: Message[];
    isLoading: boolean;
};

const useCase = new ChatUseCase();

const Chat = defineComponent({
    components: { MessageComponent, loader },
    beforeMount() {
        console.log("key from preview: ", this.$route.query.dialogKey as string);

        const dialogKey = this.$route.query.dialogKey as string;
        this.isLoading = true;
        useCase.getMessages(dialogKey).then(res => {
            this.isLoading = false;
            if (res.isSuccess) {
                this.messages = res.value;
            } else if (res.isFailure) {
                const err = res.errorOrNull();
                alert(err ?? "Неизвестная ошибка");
            }
        });
    },
    setup() {
        const state = reactive<ChatState>({ messages: [], isLoading: true });

        return state;
    }
});

export default Chat;
</script>

<style scoped>
.chat {
    width: 65%;
    margin: 10% auto;
}

.heading {
    font-size: 1.6rem;
    color: cornflowerblue;
}

#loader {
    position: relative;
    margin-top: 30%;
}
</style>

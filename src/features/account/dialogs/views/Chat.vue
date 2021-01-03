<template>
    <div class="chat">
        <h2 class="heading">Сообщения</h2>
        <form class="send" @submit.prevent="sendMsg">
            <textarea id="input" v-model="draft" rows="1" />
            <button id="btn" type="submit"><loader id="btn-loader" :showing="isSendLoading" />{{ isSendLoading ? "" : "Отправить" }}</button>
        </form>
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
import SendMsgBody from "@/domain/account/dialogs/chat/model/sendMessageBody";

type ChatState = {
    messages: Message[];
    isLoading: boolean;
    isSendLoading: boolean;
    draft: string;
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
    methods: {
        sendMsg() {
            if (this.draft.length > 0) {
                this.isSendLoading = true;
                console.log("dialogKey from route on send: ", this.$route.query.dialogKey);

                const body: SendMsgBody = {
                    dialogKey: this.$route.query.dialogKey as string,
                    message: this.draft
                };
                useCase.sendMessage(body).then(res => {
                    this.draft = "";
                    this.isSendLoading = false;
                    if (res.isSuccess) {
                        this.messages = res.value;
                    } else {
                        alert(res.errorOrNull() ?? "Неизвестная ошибка");
                    }
                });
            }
        }
    },
    setup() {
        const state = reactive<ChatState>({
            messages: [],
            isLoading: true,
            isSendLoading: false,
            draft: ""
        });

        return state;
    }
});

export default Chat;
</script>

<style scoped>
.chat {
    width: 60%;
    margin: 6% auto;
}

.heading {
    font-size: 1.6rem;
    color: cornflowerblue;
}

.send {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-bottom: 8px;
}

.send #input {
    width: 40%;
    padding: 8px;
    margin-right: 8px;
    max-width: 40%;
    height: 16px;
    min-height: 16px;
    max-height: 128px;
}

.send #btn {
    padding: 4px 6px;
    margin: auto 0;
    width: fit-content;
    height: fit-content;
    vertical-align: middle;
    text-align: center;
}

#loader {
    position: relative;
    margin-top: 30%;
}

#btn-loader {
    width: 4px;
    height: 4px;
    display: inline-block;
}
</style>

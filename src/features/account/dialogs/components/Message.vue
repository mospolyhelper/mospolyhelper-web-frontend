<template>
    <div class="message">
        <img id="avatar" v-if="message.avatarUrl" :src="IMG_BASE_URL + message.avatarUrl" />
        <div class="msg-body">
            <span id="sender">{{ message.authorName }}</span>
            <div id="text" v-html="message.message" />
            <div id="attachments">
                <Attachment
                    v-for="(attachment, idx) in message.attachments"
                    :key="attachment.url"
                    :attachment="attachment"
                    :style="{ marginRight: idx < message.attachments.length + 1 ? '8px' : '0' }"
                />
            </div>
        </div>
        <!-- <div class="delete">
            <img
                id="icon"
                v-if="message.removeUrl"
                @click="deleteMsg"
                src="../../../../assets/recycle-bin.svg"
            />
            <span id="tooltip">Удалить сообщение</span>
        </div> -->
    </div>
</template>

<script lang="ts">
import Message from "@/domain/account/dialogs/chat/model/message";
import Attachment from "./Attachment.vue";
import { IMG_BASE_URL } from "@/data/client";
import { computed, defineComponent, PropType } from "vue";

type MessageComponentProps = {
    message: Message;
};

const MessageComponent = defineComponent({
    components: { Attachment },
    props: {
        message: { type: Object as PropType<Message>, required: true }
    },
    data() {
        return {
            IMG_BASE_URL: IMG_BASE_URL
        };
    },
    methods: {
        deleteMsg() {
            alert("Not yet implemented");
        }
    },
    setup(props: MessageComponentProps) {
        // const msg = props.message
        // const author = computed(() => msg.authorName + (msg.authorGroup ? ` – ${msg.authorGroup}` : ""));
    }
});

export default MessageComponent;
</script>

<style scoped>
.message {
    display: flex;
    justify-content: left;
    background: honeydew;
    margin-bottom: 4px;
    box-sizing: border-box;
    padding: 8px 16px 8px 12px;
}

#avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 12px;
}

.msg-body {
    display: flex;
    flex-direction: column;
    align-items: top;
    width: 100%;
}

.msg-body #sender {
    margin-top: 6px;
    font-size: 0.95rem;
    color: lightslategrey;
}

.msg-body #text {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 6px;
}

.msg-body #attachments {
    display: flex;
    justify-content: left;
}

.delete {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-items: center;
}

.delete #icon {
    width: 18px;
    height: 18px;
}

.delete #tooltip {
    display: none;
    position: absolute;
    border-radius: 5px;
    font-size: 0.8rem;
    padding: 8px;
    right: 100px;
    margin-top: 22px;
    background: rgba(51, 51, 51, 0.9);
    color: #fff;
}

.delete:hover #tooltip {
    display: block;
}
</style>

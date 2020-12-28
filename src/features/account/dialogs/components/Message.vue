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
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTI4IDQwSDExLjhjLTMuMyAwLTUuOS0yLjctNS45LTUuOVYxNmMwLS42LjQtMSAxLTFzMSAuNCAxIDF2MTguMWMwIDIuMiAxLjggMy45IDMuOSAzLjlIMjhjMi4yIDAgMy45LTEuOCAzLjktMy45VjE2YzAtLjYuNC0xIDEtMXMxIC40IDEgMXYxOC4xYzAgMy4yLTIuNyA1LjktNS45IDUuOXoiLz48cGF0aCBkPSJNMzMuMyA0LjloLTcuNkMyNS4yIDIuMSAyMi44IDAgMTkuOSAwcy01LjMgMi4xLTUuOCA0LjlINi41QzQuMiA0LjkgMi40IDYuNyAyLjQgOXMxLjggNCA0LjEgNGgyNi45YzIuMyAwIDQuMS0xLjggNC4xLTQuMXMtMS45LTQtNC4yLTR6TTE5LjkgMmMxLjggMCAzLjMgMS4yIDMuNyAyLjloLTcuNWMuNS0xLjcgMi0yLjkgMy44LTIuOXptMTMuNCA5SDYuNWMtMS4xIDAtMi4xLS45LTIuMS0yLjEgMC0xLjEuOS0yLjEgMi4xLTIuMWgyNi45YzEuMSAwIDIuMS45IDIuMSAyLjEtLjEgMS4yLTEgMi4xLTIuMiAyLjF6Ii8+PHBhdGggZD0iTTEyLjkgMzUuMWMtLjYgMC0xLS40LTEtMVYxNy40YzAtLjYuNC0xIDEtMXMxIC40IDEgMXYxNi43YzAgLjUtLjUgMS0xIDF6Ii8+PHBhdGggZD0iTTI2LjkgMzUuMWMtLjYgMC0xLS40LTEtMVYxNy40YzAtLjYuNC0xIDEtMXMxIC40IDEgMXYxNi43YzAgLjUtLjUgMS0xIDF6Ii8+PHBhdGggZD0iTTE5LjkgMzUuMWMtLjYgMC0xLS40LTEtMVYxNy40YzAtLjYuNC0xIDEtMXMxIC40IDEgMXYxNi43YzAgLjUtLjUgMS0xIDF6Ii8+PG1ldGFkYXRhPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6cmRmcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48cmRmOkRlc2NyaXB0aW9uIGFib3V0PSJodHRwczovL2ljb25zY291dC5jb20vbGVnYWwjbGljZW5zZXMiIGRjOnRpdGxlPSJiaW4sZGVsZXRlLHJlbW92ZSx0cmFzaCx0IiBkYzpkZXNjcmlwdGlvbj0iYmluLGRlbGV0ZSxyZW1vdmUsdHJhc2gsdCIgZGM6cHVibGlzaGVyPSJJY29uc2NvdXQiIGRjOmRhdGU9IjIwMTctMDktMjYiIGRjOmZvcm1hdD0iaW1hZ2Uvc3ZnK3htbCIgZGM6bGFuZ3VhZ2U9ImVuIj48ZGM6Y3JlYXRvcj48cmRmOkJhZz48cmRmOmxpPlRoZSBFeWVjb25zPC9yZGY6bGk+PC9yZGY6QmFnPjwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC9tZXRhZGF0YT48L3N2Zz4="
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

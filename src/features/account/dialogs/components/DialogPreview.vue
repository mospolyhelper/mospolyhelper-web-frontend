<template>
    <div class="preview" @click="openDialogPage">
        <div class="receiver">
            <img id="avatar" :src="IMG_BASE_URL + dialog.avatarUrl" />
        </div>

        <div class="sender">
            <div>
                <span id="receiver-name">{{ author }}</span>
                <span class="date">{{ dialog.date }}</span>
            </div>
            <div id="identity">
                <img id="avatar" :src="IMG_BASE_URL + dialog.senderImageUrl" />
                <span id="name">{{ dialog.senderName }}</span>
            </div>
            <span id="message" v-html="dialog.message" />
        </div>
    </div>
</template>

<script lang="ts">
import DialogPreview from "@/domain/account/dialogs/model/dialogs";
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";

type DialogPreviewState = {};

type DialogPreviewProps = {
    dialog: DialogPreview;
};

const DialogPreview = defineComponent({
    props: {
        dialog: { type: Object as PropType<DialogPreview>, required: true }
    },
    data() {
        return {
            IMG_BASE_URL: "https://e.mospolytech.ru/"
        };
    },
    methods: {
        openDialogPage() {}
    },
    setup(props: DialogPreviewProps) {
        const state = reactive<DialogPreviewState>({});
        const { dialog } = props;

        const author = computed(() => dialog.authorName + (dialog.authorGroup ? ` – ${dialog.authorGroup}` : ""));

        return { ...toRefs(state), author };
    }
});

export default DialogPreview;
</script>

<style scoped>
.preview {
    transition: background 0.3s ease;
    background: rgba(245, 255, 250, 0.7);
    display: flex;
    justify-content: left;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(112, 128, 144, 0.3);
    padding: 12px 16px;
}

.preview:hover {
    background: rgba(227, 236, 232, 0.9);
}

.preview .receiver {
    padding: 2px 18px 8px 0;
}

.receiver #avatar {
    width: 56px;
    height: 56px;
}

.preview img {
    border: 1px solid rgba(112, 128, 144, 0.5);
    border-radius: 50%;
}

.preview .sender {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
    margin-top: 4px;
}

.sender #receiver-name {
    font-size: 1.05rem;
}

.sender #identity {
    display: flex;
    align-items: top;
    margin-top: 6px;
}

.sender #avatar {
    width: 24px;
    height: 24px;
}

.sender #name {
    align-self: center;
    margin-left: 8px;
    margin-top: -1px;
    font-size: 0.9rem;
    color: rgb(112, 128, 144);
}

.sender #message {
    margin-left: 35px;
    margin-top: 4px;
    margin-right: 14%;
}

.date {
    float: right;
    color: slategrey;
    font-size: 0.8rem;
}
</style>

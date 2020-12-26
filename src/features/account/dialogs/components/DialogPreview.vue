<template>
    <div @click="openDialog">
        <img :src="dialog.avatarUrl" />
        <p>{{ dialog.authorName }}</p>
        <p>{{ dialog.authorGroup }}</p>
        <p>{{ dialog.message }}</p>
        
        <p>{{ dialog.date }}</p>
    </div>
</template>

<script lang="ts">
import DialogPreview from "@/domain/account/dialogs/model/dialogs";
import { defineComponent, PropType } from "vue";

const DialogPreview = defineComponent({
    props: {
        dialog: Object as PropType<DialogPreview>
    },
    methods: {
        openDialog() {

        }
    }
});

export default DialogPreview;
</script>

<style scoped></style>

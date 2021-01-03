<template>
    <div v-if="title || text">
        <p v-if="title" class="inline title" v-html="title + delimeter" />
        <p class="inline text" v-html="text" />
        <br /><br />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export type TextRowProps = {
    title?: string;
    text?: string;
    delimeter?: string;
};

const TextRow = defineComponent({
    props: {
        title: String,
        text: String,
        delimeter: { type: String, default: "" }
    }
});

export default TextRow;
</script>

<style scoped>
.title {
    margin-right: 12px;
    font-size: 1.1rem;
}

.text {
    font-weight: bold;
}
</style>

<template>
    <div v-if="title || text">
        <p v-if="title" class="text-row-title">{{ title + delimeter }}</p>
        <p class="text-row-text">
            <strong>{{ text }}</strong>
        </p>
    </div>
    <br />
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
.text-row-title {
    display: inline;
    margin-right: 8px;
}

.text-row-text {
    display: inline;
    font-weight: bold;
}
</style>

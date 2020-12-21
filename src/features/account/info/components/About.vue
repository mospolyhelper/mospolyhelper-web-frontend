<template>
    <TextRow
        v-for="({ title, text }, index) in fields"
        :key="'row' + index"
        :title="title"
        delimeter=":"
        :text="text"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import TextRow from "@/features/account/info/components/TextRow.vue";
import { TextRowProps } from "./TextRow.vue";

const About = defineComponent({
    components: {
        TextRow
    },
    props: {
        fields: Array as PropType<TextRowProps[]>
    }
});

export default About;
</script>

<style scoped></style>

<template>
    <div class="history">
        <h2 id="title" v-if="applications?.length > 0" v-text="'История запросов'" />
        <ApplicationRow
            v-for="applic in applications"
            :key="applic.registrationNumber"
            :application="applic"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import Application from "@/domain/account/applications/model/application";
import ApplicationRow from "@/features/account/applications/components/ApplicationRow.vue";

const History = defineComponent({
    components: { ApplicationRow },
    props: {
        applications: Array as PropType<Application[]>
    },
    setup() {}
});

export default History;
</script>

<style scoped>
.history > #title {
    user-select: none;
}
</style>

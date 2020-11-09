<template>
    <div>
        <h2>Map sample</h2>
        <YandexMap />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YandexMap from "../components/map/YandexMap.vue";

const MapPage = defineComponent({
    components: { YandexMap }
});

export default MapPage;
</script>

<style scoped></style>

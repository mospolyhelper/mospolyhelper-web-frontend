<template>
    <div class="map">
        <YandexMap />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YandexMap from "@/features/locations/components/YandexMap.vue";

const Locations = defineComponent({
    components: { YandexMap },
    setup() {

    }
});

export default Locations;
</script>

<style scoped>
.map {
    width: 90vw;
    height: 80vh;

    display: flex;
    align-self: center;
    justify-self: center;
}
</style>

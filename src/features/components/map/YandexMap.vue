<template>
    <div id="yandex-map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { CENTER_OF_MOSCOW, Lang, LatLng, DEFAULT_MAP_SETTINGS, mapLoader } from "@/features/components/map/utils";

type YandexMapProps = {
    apiKey: string;
    lang: Lang;
    center: LatLng;
    zoom: number;
    markers: ymaps.GeoObjectCollection;
};

const YandexMap = defineComponent({
    props: {
        apiKey: { type: String, required: true },
        lang: { type: Lang, required: true, default: Lang.RU },
        zoom: { type: Number, default: 11 },
        center: { type: LatLng, default: CENTER_OF_MOSCOW },
        markers: ymaps.GeoObjectCollection
    },
    setup(props: YandexMapProps) {
        const map = ref<ymaps.Map | null>(null);

        onMounted(() => {
            mapLoader(DEFAULT_MAP_SETTINGS).then(() => {
                console.log("in then");
                const { center, zoom } = props;
                map.value = new ymaps.Map("yandex-map", {
                    center: [center.latitude, center.longitude],
                    zoom: zoom
                });
            });
        });

        return { map };
    }
});

export default YandexMap;
</script>

<style scoped>
#yandex-map {
    height: 70vh;
    margin: 16px 10%;

    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

<template>
    <div id="yandex-map" />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import {
    CENTER_OF_MOSCOW,
    Lang,
    DEFAULT_MAP_SETTINGS,
    mapLoader,
    LatLng,
    MapSettings,
} from "../utils";

type YandexMapProps = MapSettings & {
    markers: ymaps.GeoObjectCollection[];
};

const YandexMap = defineComponent({
    props: {
        apiKey: { type: String, required: true, default: DEFAULT_MAP_SETTINGS.apiKey },
        lang: { type: String as PropType<Lang>, required: true, default: DEFAULT_MAP_SETTINGS.lang },
        load: { type: String, default: DEFAULT_MAP_SETTINGS.load },
        zoom: { type: Number, default: DEFAULT_MAP_SETTINGS.zoom },
        center: { type: Object as PropType<LatLng>, default: DEFAULT_MAP_SETTINGS.center },
        markers: { type: Array as PropType<ymaps.GeoObjectCollection[]>, default: [] },
    },
    setup(props: YandexMapProps) {
        const map = ref<ymaps.Map | null>(null);

        watch(map, (map, prev) => {
            console.log('locations updated', props.markers);
            
            prev?.destroy();
            // props.markers.forEach (marker => locations?.geoObjects.add(marker));
            // const pin = new ymaps.Placemark([55.75396, 37.620393], {}, { visible: true });
            props.markers.forEach(objects => map?.geoObjects.add(objects))
        });

        onMounted(() => {
            mapLoader(DEFAULT_MAP_SETTINGS).then(() => {
                const { center, zoom } = props;
                map.value = new ymaps.Map("yandex-map", {
                    center: [center.latitude, center.longitude],
                    zoom: zoom,
                });
            });
        });
    },
});

export default YandexMap;
</script>

<style scoped></style>

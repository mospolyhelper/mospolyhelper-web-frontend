<template>
    <div class="map" id="yandex-map" />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import {
    coordsToArray,
    DEFAULT_MAP_SETTINGS,
    Lang,
    LatLng,
    mapLoader,
    MapSettings
} from "../utils";
import { BasePin, Campus, Locations } from "@/domain/locations/model/Locations";
import getLocations from "@/data/locations/repository/locationsRepository";
import { computed } from "@vue/reactivity";

type YandexMapProps = MapSettings & {
    markers: Locations;
};

const YandexMap = defineComponent({
    props: {
        apiKey: { type: String, default: DEFAULT_MAP_SETTINGS.apiKey },
        lang: {
            type: String as PropType<Lang>,
            default: DEFAULT_MAP_SETTINGS.lang
        },
        load: { type: String, default: DEFAULT_MAP_SETTINGS.load },
        zoom: { type: Number, default: DEFAULT_MAP_SETTINGS.zoom },
        center: {
            type: Object as PropType<LatLng>,
            default: DEFAULT_MAP_SETTINGS.center
        },
        markers: { type: Object as PropType<Locations>, default: {} }
    },
    setup(props: YandexMapProps) {
        const map = ref<ymaps.Map | null>(null);
        const pins = ref<Locations>(props.markers);

        watch(map, (map, prev) => {
            console.log("locations updated", props.markers);

            prev?.destroy();
            // const pin = new ymaps.Placemark([55.75396, 37.620393], {}, { visible: true });
            // let pins: BasePin[] = [];
            // if (props.markers.campuses) pins.push(...props.markers.campuses)
            // if (props.markers.gyms) pins.push(...props.markers.gyms)
            // if (props.markers.hostels) pins.push(...props.markers.hostels)
            //
            // pins.forEach(pin => {
            //     const placemark = toPlacemark(pin);
            //     map?.geoObjects.add(placemark);
            // });
            getLocations().then(data => {
                pins.value = data;
                console.log("got new locations:", data);
            });
        });

        watch(pins, (newPins, prevPins) => {
            // const newPins = pins.value
            if (!newPins.campuses) return;
            console.log("updPins =", newPins.campuses);

            const testPin: Campus = newPins.campuses[0];
            const mark = new ymaps.Placemark(
                coordsToArray(testPin.coordinates),
                {}
            );
            map.value?.geoObjects.add(mark);

            // if (!newPins.gyms) return;
            // const testPin2: Campus = newPins.gyms[0];
            // const mark2 = new ymaps.Placemark(
            //     coordsToArray(testPin2.coordinates),
            //     {}
            // );
            // map.value?.geoObjects.add(mark2);

            // if (!newPins.hostels) return;
            // const testPin3: Campus = newPins.hostels[0];
            // const mark3 = new ymaps.Placemark(
            //     coordsToArray(testPin.coordinates),
            //     {}
            // );
            // map.value?.geoObjects.add(mark3);
        });

        onMounted(() => {
            mapLoader(DEFAULT_MAP_SETTINGS).then(() => {
                const { center, zoom } = props;
                map.value = new ymaps.Map("yandex-map", {
                    center: [center.latitude, center.longitude],
                    zoom: zoom
                });
            });
        });
    }
});

// function toPlacemark(marker: BasePin): ymaps.Placemark {
//     return new ymaps.Placemark(coordsToArray(marker.coordinates), {
//         hintContent: marker.title,
//         balloonContentHeader: marker.title,
//         balloonContentBody: marker.description
//     });
// }

export default YandexMap;
</script>

<style scoped>
.map {
    height: 80vh;
    width: 80vw;
}
</style>

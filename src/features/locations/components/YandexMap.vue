<template>
    <div class="map" id="yandex-map" />
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
    watchEffect
} from "vue";
import {
    coordsToArray,
    DEFAULT_MAP_SETTINGS,
    Lang,
    mapLoader,
    MapSettings
} from "../utils";
import {
    Addresses,
    BasePin,
    Campus,
    Coords
} from "@/domain/locations/model/Locations";
import { computed } from "@vue/reactivity";

type YandexMapProps = MapSettings & {
    markers: Addresses;
};

let map: ymaps.Map | null = null;

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
            type: Object as PropType<Coords>,
            default: DEFAULT_MAP_SETTINGS.center
        },
        markers: {
            type: Object as PropType<Addresses>,
            default: {}
        }
    },
    setup(props: YandexMapProps) {
        onMounted(() => {
            mapLoader(props).then(() => {
                const { center, zoom } = props;
                map = new ymaps.Map("yandex-map", {
                    center: [center.lat, center.lng],
                    zoom: zoom
                });
                console.log("map initialized");

                watchEffect(() => {
                    console.log("markers in props changes observed");
                    map?.geoObjects.removeAll();
                    convertToPlacemarks(props.markers).forEach(col =>
                        map?.geoObjects.add(col)
                    );
                });
            });
        });
    }
});

const campusesOptions = {
    preset: "islands#blueEducationCircleIcon"
};

const gymsOptions = {
    preset: "islands#blueSportCircleIcon"
};

const hostelsOptions = {
    preset: "islands#blueHomeCircleIcon"
};
/**
 *
 * BE CAREFUL! Invoke only if yandex map's script has already loaded
 */
function convertToPlacemarks(
    addresses: Addresses
): ymaps.GeoObjectCollection[] {
    const campusesCollection = new ymaps.GeoObjectCollection(
        undefined,
        campusesOptions
    );
    const gymsCollection = new ymaps.GeoObjectCollection(
        undefined,
        gymsOptions
    );
    const hostelsCollection = new ymaps.GeoObjectCollection(
        undefined,
        hostelsOptions
    );

    addresses.campuses?.forEach(campus =>
        campusesCollection.add(toPlacemark(campus))
    );
    addresses.gyms?.forEach(gym => gymsCollection.add(toPlacemark(gym)));
    addresses.hostels?.forEach(hostel =>
        hostelsCollection.add(toPlacemark(hostel))
    );

    return [campusesCollection, gymsCollection, hostelsCollection];
}

function toPlacemark(marker: BasePin): ymaps.Placemark {
    return new ymaps.Placemark(coordsToArray(marker.coordinates), {
        hintContent: marker.title,
        balloonContentHeader: marker.title,
        balloonContentBody: marker.description
    });
}

export default YandexMap;
</script>

<style scoped>
.map {
    height: 80vh;
    width: 80vw;
    margin: 5% auto;
}
</style>
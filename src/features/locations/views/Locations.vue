<template>
    <YandexMap :markers="locations" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import YandexMap from "@/features/locations/components/YandexMap.vue";
import getLocations from "@/data/locations/repository/locationsRepository";
import {
    Campus,
    Coords,
    Gym,
    Hostel,
    Locations
} from "@/domain/locations/model/Locations";

const Locations = defineComponent({
    components: { YandexMap },
    setup() {
        const locations = ref<Locations>({});
        getLocations().then(data => {
            locations.value = data;
            console.log("got new locations:", data);
        });
        return { locations };
    }
});

// function campusToGeoObject(campus: Campus): ymaps.GeoObject {
//     return new ymaps.Placemark(coordsToArray(campus.coordinates), {});
// }
//
// function gymToGeoObject(gym: Gym): ymaps.GeoObject {
//     return new ymaps.Placemark(coordsToArray(gym.coordinates), {});
// }
//
// function hostelToGeoObject(hostel: Hostel): ymaps.GeoObject {
//     return new ymaps.Placemark(coordsToArray(hostel.coordinates), {});
// }
//
// const coordsToArray = (coords: Coords) => [coords.latitude, coords.longitude];

export default Locations;
</script>

<style scoped></style>

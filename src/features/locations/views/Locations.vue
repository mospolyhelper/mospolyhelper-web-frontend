<template>
    <YandexMap :markers="locations" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import YandexMap from "@/features/locations/components/YandexMap.vue";
import getLocations from "@/data/locations/repository/locationsRepository";
import LocationsUseCase from "@/domain/locations/usecase/locationsUseCase";
import {
    Addresses,
    Campus,
    Coords,
    Gym,
    Hostel
} from "@/domain/locations/model/Locations";
import Locations from "@/domain/locations/model/Locations";

const useCase = new LocationsUseCase();

const Locations = defineComponent({
    components: { YandexMap },
    setup() {
        const locations = ref<Addresses>({});
        useCase.getLocations().then(data => {
            console.log('locations loaded', data.tostring());
            
            const addresses = data.getOrNull()?.addresses;
            if (addresses) {
                locations.value = addresses;
            } else {
                // todo: display an error
                console.log('there is an error or addresses are null.', 'Error is', data.errorOrNull);
            }
        });
        return { locations };
    }
});
export default Locations;
</script>

<style scoped></style>

<template>
    <YandexMap :markers="locations" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import YandexMap from "@/features/locations/components/YandexMap.vue";
import getLocations from "@/data/locations/repository/locationsRepository";
import LocationsUseCase from "@/domain/locations/usecase/locationsUseCase";
import { Addresses, Campus, Coords, Gym, Hostel } from "@/domain/locations/model/Locations";
import Locations from "@/domain/locations/model/Locations";

type LocationsState = {
    locations: Addresses;
};

const useCase = new LocationsUseCase();

const Locations = defineComponent({
    components: { YandexMap },
    setup() {
        const state = reactive<LocationsState>({
            locations: {}
        });

        useCase.getLocations().then(data => {
            if (data.isSuccess) {
                state.locations = data.value.addresses;
            } else {
                alert(data.errorOrNull() ?? "Неизвестная ошибка");
            }
        });

        return state;
    }
});
export default Locations;
</script>

<style scoped></style>

<template>
    <div class="applications">
        <History :applications="applications" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import History from "../components/History.vue";
import ApplicationsUseCase from "@/domain/account/applications/usecase/applicationsUseCase";
import Application from "@/domain/account/applications/model/application";

type ApplicationsState = {
    applications: Application[];
};

const useCase = new ApplicationsUseCase();

const Applications = defineComponent({
    components: { History },
    setup() {
        const state = reactive<ApplicationsState>({
            applications: []
        });

        useCase.getApplications().then(res => {
            if (res.isSuccess) {
                state.applications = res.value;
            } else if (res.isFailure) {
                alert(res.errorOrNull());
            }
        });

        return state;
    }
});

export default Applications;
</script>

<style scoped>
.applications {
    width: 80%;
    margin: 6% auto;
}    
</style>

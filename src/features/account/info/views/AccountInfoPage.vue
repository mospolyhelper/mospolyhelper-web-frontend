<template>
    <p class="info-heading">{{ info.name }}</p>
    <About v-if="info" :fields="fields" />
    
    <p class="info-heading">Приказы</p>
    <TextRow
        v-for="(order, idx) in info.orders"
        :key="'order' + idx"
        :text="order"
    />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import About from "@/features/account/info/components/About.vue";
import TextRow from "@/features/account/info/components/TextRow.vue";
import InfoUseCase from "@/domain/account/info/usecase/infoUseCase";
import AccountInfo from "@/domain/account/info/model/accountInfo";
import { TextRowProps } from "../components/TextRow.vue";

const useCase = new InfoUseCase();

const AccountInfoPage = defineComponent({
    components: { About, TextRow },
    setup() {
        const info = ref<AccountInfo | null>(null);
        const fields = computed(() =>
            info.value ? convertInfoToFields(info.value) : []
        );

        useCase.getAccountInfo().then(result => {
            info.value = result.getOrNull();
            // todo: display an error if null
        });

        return { info, fields };
    }
});

function convertInfoToFields(info: AccountInfo): TextRowProps[] {
    return [
        {
            title: "Статус",
            text: info.status
        },
        {
            title: "Пол",
            text: info.sex
        },
        {
            title: "Дата рождения",
            text: info.birthDate
        },
        {
            title: "Код студента",
            text: info.studentCode
        },
        {
            title: "Факультет",
            text: info.faculty
        },
        {
            title: "Курс",
            text: info.course
        },
        {
            title: "Группа",
            text: info.group
        },
        {
            title: "Специальность",
            text: info.direction
        },
        {
            title: "Специализация",
            text: info.specialization
        },
        {
            title: "Срок обучения",
            text: info.educationPeriod
        },
        {
            title: "Форма обучения",
            text: info.educationForm
        },
        {
            title: "Уровень образования",
            text: info.educationLevel
        },
        {
            title: "Вид финансирования",
            text: info.financingType
        },
        {
            title: "Год набора",
            text: info.admissionYear
        }
    ];
}

export default AccountInfoPage;
</script>

<style scoped>
.info-heading {
    color: cornflowerblue;
    font-size: 1.6em;
    font-weight: bold;
}
</style>

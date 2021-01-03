<template>
    <div style="margin: 64px 15%;">
        <loader id="loader" :showing="isLoading" />
        <p v-if="info?.name" class="info-heading">{{ info.name }}</p>
        <About v-if="info" :fields="fields" />

        <p v-if="info?.orders" class="info-heading">Приказы</p>
        <TextRow v-for="(order, idx) in info?.orders" :key="'order' + idx" :text="order" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import About from "@/features/account/info/components/About.vue";
import TextRow from "@/features/common/components/TextRow.vue";
import InfoUseCase from "@/domain/account/info/usecase/infoUseCase";
import AccountInfo from "@/domain/account/info/model/accountInfo";
import { TextRowProps } from "@/features/common/components/TextRow.vue";
import loader from "@/features/common/components/lodingAnimation.vue";

type AccountInfoState = {
    info: AccountInfo | null;
    isLoading: boolean;
};

const useCase = new InfoUseCase();

const AccountInfoPage = defineComponent({
    components: { About, TextRow, loader },
    setup() {
        const state = reactive<AccountInfoState>({
            info: null,
            isLoading: true
        });
        const fields = computed(() => (state.info ? convertInfoToFields(state.info) : []));

        useCase.getAccountInfo().then(result => {
            state.isLoading = false;
            if (result.isSuccess) {
                state.info = result.value;
            } else {
                const err = result.errorOrNull();
                alert(err ?? "Неизвестная ошибка");
            }
        });

        return { ...toRefs(state), fields };
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
    margin-left: -24px;
    color: cornflowerblue;
    font-size: 1.6em;
    font-weight: bold;
}

#loader {
    position: relative;
    margin-top: 40%;
}
</style>

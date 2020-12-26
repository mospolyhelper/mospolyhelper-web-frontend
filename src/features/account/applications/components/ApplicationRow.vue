<template>
    <div class="application-row">
        <div class="preview" @click="toggleRowVisibility">
            <p class="inline title">{{ application.name }}</p>
            <p class="inline title">{{ application.dateTime }}</p>
        </div>
        <transition name="collapse">
            <div class="content" v-if="!collapsed">
                <TextRow
                    class="text-row"
                    title="Регистрационный номер"
                    :text="application.registrationNumber"
                    delimeter=":"
                />
                <TextRow
                    class="text-row"
                    title="Статус, дата"
                    :text="application.status"
                    delimeter=":"
                />
                <TextRow
                    class="text-row"
                    title="Структурное подразделение, адрес"
                    :text="application.department"
                    delimeter=":"
                />
                <TextRow
                    class="text-row"
                    title="Примечание"
                    :text="application.note"
                    delimeter=":"
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import Application from "@/domain/account/applications/model/application";
import TextRow from "@/features/common/components/TextRow.vue";

const ApplicationRow = defineComponent({
    components: { TextRow },
    methods: {
        toggleRowVisibility() {
            this.collapsed = !this.collapsed;
        }
    },
    props: {
        application: Object as PropType<Application>
    },
    setup() {
        const state = reactive({ collapsed: true });

        return state;
    }
});

export default ApplicationRow;
</script>

<style scoped>
.title {
    font-size: 1.15rem;
}

.text-row {
    display: flex;
    justify-content: left;
    align-items: center;
}

.application-row {
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.application-row > .preview {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    transition: background .4s ease;
}

.application-row > .preview:hover {
    background: #eee;
    cursor: pointer;
}

.application-row > div {
    padding: 12px 24px;
}

.application-row > .content {
    width: 100%;
    background: #eee;
    display: flex;
    flex-direction: column;
    align-items: left;
}

.collapse-enter-active {
    transition: transform .2s ease;
}

.collapse-leave-active {
    transition: transform .2s ease;
}

.collapse-enter-from, .collapse-leave-to {
    transform: scaleY(0);
}
</style>

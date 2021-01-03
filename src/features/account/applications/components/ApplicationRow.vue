<template>
    <div class="application-row">
        <div class="preview" @click="toggleRowVisibility">
            <div>
                <span class="title">{{ application.name }}</span>
                <span class="status">{{ statusShortcut }}</span>
            </div>
            <div id="creation-date">{{ application.dateTime }}</div>
        </div>
        <transition name="collapse">
            <div class="content" v-if="!collapsed">
                <TextRow
                    class="text-row"
                    title="Регистрационный номер"
                    :text="application.registrationNumber"
                    delimeter=":"
                />
                <TextRow class="text-row" title="Статус, дата" :text="application.status" delimeter=":" />
                <TextRow
                    class="text-row"
                    title="Структурное подразделение, адрес"
                    :text="application.department"
                    delimeter=":"
                />
                <TextRow class="text-row" title="Примечание" :text="application.note" delimeter=":" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import Application from "@/domain/account/applications/model/application";
import TextRow from "@/features/common/components/TextRow.vue";

type ApplicationRowProps = {
    application: Application;
};

const ApplicationRow = defineComponent({
    components: { TextRow },
    methods: {
        toggleRowVisibility() {
            this.collapsed = !this.collapsed;
        }
    },
    props: {
        application: { type: Object as PropType<Application>, required: true }
    },
    setup(props: ApplicationRowProps) {
        const state = reactive({ collapsed: true });
        const statusShortcut = computed(() => props.application.status?.replaceAll("<br><br>", " – "));

        return { ...toRefs(state), statusShortcut };
    }
});

export default ApplicationRow;
</script>

<style scoped>
.title {
    display: block;
    font-size: 1.15rem;
}

.status {
    display: inline-block;
    margin-top: 6px;
    font-size: 0.9rem;
    color: rgba(128, 128, 128, 0.85);
}

#creation-date {
    align-self: center;
    color: rgba(128, 128, 128, 0.7);
}

.text-row {
    display: flex;
    justify-content: left;
    align-items: center;
}

* {
    box-sizing: border-box;
}

.application-row {
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.application-row > .preview {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    transition: background 0.4s ease;
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
    transition: transform 0.2s ease;
}

.collapse-leave-active {
    transition: transform 0.2s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    transform: scaleY(0);
}
</style>

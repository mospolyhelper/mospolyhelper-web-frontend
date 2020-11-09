<template>
    <div>
        <router-link
            :to="to"
            class="nav-link"
            :class="active ? 'font-weighted-bold' : null"
        >
            <slot />
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

type HeaderLinkProps = {
    to: string;
    exact: boolean;
};

const HeaderLink = defineComponent({
    props: {
        to: { type: String, required: true },
        exact: { type: Boolean, default: false }
    },
    setup(props: HeaderLinkProps) {
        const route = useRoute();
        const active = computed(() =>
            props.exact
                ? route.path === props.to
                : route.path.startsWith(props.to)
        );

        return { active };
    }
});

export default HeaderLink;
</script>

<style scoped>
.nav-link {
    font-size: 22px;
    text-decoration: none;
    color: cadetblue;

    margin: 0 6px;
}
</style>

<template>
    <div class="nav-link-div">
        <div class="nav-link-center">
            <router-link :to="to"
                         class="nav-link">
                <slot />
            </router-link>
        </div>
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
    .nav-link-center {
        margin: 0;
        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        margin: auto 15px;
    }
    .nav-link {      
        font-size: 20px;
        text-decoration: none;
        color: #918b8f;
    }
    .nav-link-div {
        text-align: center;
        height: 50px;
        float: left;
    }
        .nav-link-div:hover {
            background-color: #cbedff;
        }
</style>

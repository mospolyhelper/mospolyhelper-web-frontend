<template>
    <div class="loader" v-show="showing" >
        <div class="loader-icon" />
        <span>Загрузка...</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const loader = defineComponent({
    props: {
        showing: Boolean
    }
});
export default loader;
</script>

<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    position: absolute;
    z-index: 999;
    padding: 16px;
    top: 22px;
    left: 50%;
    height: 90px;
    width: 100px;
    margin-left: -50px;
    border-radius: 16px;
    box-shadow: 0px 0px 32px 4px rgb(186 186 186 / 30%);
    transform: all .5s;
}
.loader-icon {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid #2e4054; /* Blue */
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 2s linear infinite;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

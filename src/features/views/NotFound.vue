<template>
    <div class="not-found">
        <h1>Oops!</h1>
        <h3>Here is no page you are looking for :(</h3>
    </div>
</template>

<script>
import { defineComponent } from "vue";

const NotFound = defineComponent({});

export default NotFound;
</script>

<style scoped>
.not-found {
    width: 100%;
    display: grid;
    justify-content: center;
    justify-items: center;
}
</style>

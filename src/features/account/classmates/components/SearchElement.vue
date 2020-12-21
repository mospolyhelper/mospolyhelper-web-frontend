<template>
    <div class="card">
        <img :src="imageSrc" alt="Avatar">
        <div class="container">
            <div class="title"><b>{{name}}</b></div>
            <div class="status" v-bind:class="[status=='Пользователь не на сайте' ? offline : online]"> </div>
            <button class="btn">Написать</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const searchElement = defineComponent({
        props: {
            name: String,
            avatarUrl: String,
            status: String,
            dialogKey: String
        },
        data() {
            return {
                online: 'online',
                offline: 'offline'
            }
        },
        computed: {
            imageSrc: function (): String {
                console.log("https://e.mospolytech.ru/" + this.avatarUrl);
                return `https://e.mospolytech.ru/${this.avatarUrl}`
            },
            userStatus: function (): String {
                return status == 'Пользователь не на сайте' ? "offline" : "online";
            }
        }
    });

    export default searchElement;
</script>

<style scoped>

    .title {
        margin-bottom:5px;
    }
 
    .status {
        color: white;
        padding: 6px;
        border-radius: 100%;
        display: block;
        float:right;
        margin-bottom:5px;
    }

    .online {
        background-color: #4CAF50cf;
    }
    /* Green */
    .offline {
        background-color: #f44336ea;
    }
    /* Red */

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 180px;
        border-radius: 10px;
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 3px;
        margin-left: 10px;
        margin-right: 10px;
    }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

    img {
        border-radius: 10px 10px 0 0;
        width: 180px;
        height: 180px;
    }

    .container {
        padding: 5px;
    }

    .btn {
        background-color: DodgerBlue;
        border: none;
        color: white;
        padding: 12px 16px;
        font-size: 16px;
        cursor: pointer;
    }

        /* Darker background on mouse-over */
        .btn:hover {
            background-color: RoyalBlue;
        }
    
</style>
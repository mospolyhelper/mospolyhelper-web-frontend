<template>
    <a class="attachment" :href="DOWNLOAD_FILE_BASE_URL + attachment.url" :download="attachment.name ?? 'filename'">
        <img
            id="icon"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAxOCAyMiIgdmVyc2lvbj0iMS4xIj48dGl0bGU+ZmlsZS10ZXh0PC90aXRsZT48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0NDIuMDAwMDAwLCAtMTYyOS4wMDAwMDApIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiI+PGcgaWQ9ImZpbGUtdGV4dCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ0My4wMDAwMDAsIDE2MzAuMDAwMDAwKSI+PHBhdGggZD0iTTEwIDBIMmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY2bC02LTZ6IiBpZD0iU2hhcGUiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xMCAwdjZoNiIvPjxwYXRoIGQ9Ik0xMiAxMUg0IiBpZD0iU2hhcGUiLz48cGF0aCBkPSJNMTIgMTVINCIgaWQ9IlNoYXBlIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJNNiA3SDQiLz48L2c+PC9nPjwvZz48bWV0YWRhdGE+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpyZGZzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxyZGY6RGVzY3JpcHRpb24gYWJvdXQ9Imh0dHBzOi8vaWNvbnNjb3V0LmNvbS9sZWdhbCNsaWNlbnNlcyIgZGM6dGl0bGU9ImZpbGUsdGV4dCIgZGM6ZGVzY3JpcHRpb249ImZpbGUsdGV4dCIgZGM6cHVibGlzaGVyPSJJY29uc2NvdXQiIGRjOmRhdGU9IjIwMTctMDktMTUiIGRjOmZvcm1hdD0iaW1hZ2Uvc3ZnK3htbCIgZGM6bGFuZ3VhZ2U9ImVuIj48ZGM6Y3JlYXRvcj48cmRmOkJhZz48cmRmOmxpPkZlYXRoZXIgSWNvbnM8L3JkZjpsaT48L3JkZjpCYWc+PC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L21ldGFkYXRhPjwvc3ZnPg=="
        />
        <span id="name">{{ attachment.name }}</span>
    </a>
</template>

<script lang="ts">
import { Attachment } from "@/domain/account/dialogs/chat/model/message";
import { defineComponent, PropType } from "vue";

const Attachment = defineComponent({
    props: {
        attachment: { type: Object as PropType<Attachment>, required: true }
    },
    data() {
        return {
            DOWNLOAD_FILE_BASE_URL: "https://e.mospolytech.ru/down.php?f="
        };
    }
});

export default Attachment;
</script>

<style scoped>
.attachment {
    border-radius: 6px;
    background: rgba(220, 220, 220, 0.7);
    padding: 8px;
    font-size: 0.8rem;
    text-decoration: none;
    transition: background 0.3s ease;
}

.attachment:hover {
    background: gainsboro;
}

#icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    vertical-align: middle;
}

#name {
    vertical-align: middle;
}
</style>

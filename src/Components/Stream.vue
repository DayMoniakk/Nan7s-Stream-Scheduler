<script setup lang="ts">
import { type StreamRemovedEvent } from '@/Lib/Events/StreamRemovedEvent';
import { emitEvent } from '@/Lib/Utils';

const props = defineProps<{
    dayIndex: number,
    streamIndex: number,
    time: string,
    title: string,
    isDayOff?: boolean
}>();

function handleRemoveStream() {
    emitEvent<StreamRemovedEvent>("onStreamRemoved", { dayIndex: props.dayIndex, streamIndex: props.streamIndex });
}
</script>

<template>
    <div class="stream">
        <span><span class="stream-time">{{ time }} — </span>{{ title }}</span>
        <button class="remove" v-on:click="handleRemoveStream" v-if="!isDayOff"><img src="@/Assets/icon_cancel.png" alt=""></button>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.stream {
    background-color: #23242c;
    border-radius: 999px;
    padding: 2px 12px;
    margin: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fade-in 0.25s ease;
}

.stream-time {
    color: #a8a8a8;
}

.remove {
    background: none;
    border: none;
    color: #ff4d4d;
    font-size: 24px;
    cursor: pointer;
    padding: 4px;
    user-select: none;
}


.remove img {
    width: 18px;
}
</style>
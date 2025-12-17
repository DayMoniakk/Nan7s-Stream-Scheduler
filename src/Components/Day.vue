<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import Stream from './Stream.vue';
import type { StreamData } from '@/Lib/Interfaces/StreamData';
import { addTypedEventListener } from '@/Lib/Utils';
import type { StreamRemovedEvent } from '@/Lib/Events/StreamRemovedEvent';
import { setScheduleForDay } from '@/Lib/ScheduleManager';

const props = defineProps<{
    dayIndex: number,
    dayName: string
}>();

const plannedStreams = ref<StreamData[]>([]);
const isDayOff = ref(false);
const streamTime = useTemplateRef<HTMLInputElement>("streamTime");
const streamTitle = useTemplateRef<HTMLInputElement>("streamTitle");

onMounted(() => {
    addTypedEventListener<StreamRemovedEvent>("onStreamRemoved", handleRemoveStream);
    document.addEventListener("resetSchedule", () => plannedStreams.value = []);
});

function handleSetDayOff() {
    isDayOff.value = !isDayOff.value;
}

function handleAddStream() {
    if (streamTitle.value!.value.trim() === "") return;
    if (!streamTime.value!.value) return;

    plannedStreams.value.push({ dayIndex: props.dayIndex, time: streamTime.value!.value, dayName: props.dayName, title: streamTitle.value!.value });
    setScheduleForDay(props.dayIndex, plannedStreams.value);
    streamTitle.value!.value = "";
}

function handleRemoveStream(event: CustomEvent<StreamRemovedEvent>) {
    if (event.detail.dayIndex === props.dayIndex) {
        plannedStreams.value.splice(event.detail.streamIndex, 1);
        setScheduleForDay(props.dayIndex, plannedStreams.value);
    }
}
</script>

<template>
    <div class="day" :class="{ off: isDayOff }">
        <div class="day-title">{{ dayName }}</div>
        <div class="controls">
            <input type="time" ref="streamTime" value="20:00">
            <input type="text" placeholder="Stream title" ref="streamTitle">
            <button class="btn" v-on:click="handleAddStream"><img src="@/Assets/icon_add.png" alt="add icon"></button>
            <button class="btn btn-off" v-on:click="handleSetDayOff"><img src="@/Assets/icon_sleep.png" alt="day off icon"></button>
        </div>
        <div class="schedule-list" v-for="(stream, i) in plannedStreams">
            <Stream :dayIndex="stream.dayIndex" :streamIndex="i" :time="stream.time" :title="stream.title"
                v-if="!isDayOff" />
        </div>
        <div class="schedule-list" v-if="isDayOff">
            <Stream :dayIndex="-1" :streamIndex="-1" time="💤" title="Offline" :isDayOff="true" />
        </div>
    </div>
</template>

<style scoped>
.day {
    background-color: #17181d;
    border: 1px solid #272833;
    border-radius: 12px;
    padding: 4px 16px;
    margin: 14px 0;
    transition: background-color 0.4s, border-color 0.4s;
}

.day.off {
    background-color: #1c1416;
    border-color: #3a2327;
}

.day-title {
    font-size: 18px;
    font-weight: 500;
    color: #9d9bff;
}

.controls {
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    margin: 12px 0;
}

input[type="time"],
input[type="text"] {
    background: #22232b;
    color: #fff;
    border: 1px solid #2c2e3a;
    border-radius: 8px;
    padding: 6px 10px;
}

input[type="text"] {
    width: 100%;
}

input[type="time"] {
    cursor: text;
}

.btn {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    background-color: #2b2d3a;
    color: #fff;
    transition: background-color 0.2s ease;
    user-select: none;
}

.btn img {
    width: 16px;
}

.btn:hover {
    background-color: #3a3d4a;
}

.btn-off {
    background-color: #70212e;
    color: #ff4d4d;
}

.btn-off img {
    width: 16px;
}

.btn-off:hover {
    background-color: #9c2e40;
}

.schedule-list {
    margin-top: 10px;
}
</style>
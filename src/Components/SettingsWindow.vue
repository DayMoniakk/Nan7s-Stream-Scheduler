<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

const defaultSettings = {
    "defaultTime": "20:00",
    "defaultOfflineText": "`Error 404: nan7s.exe not found`"
};

const settingDefaultTime = ref(defaultSettings.defaultTime);
const settingDefaultOfflineText = ref(defaultSettings.defaultOfflineText);

const isOpen = ref(false);
const defaultTimeInput = useTemplateRef<HTMLInputElement>("time");
const defaultOfflineText = useTemplateRef<HTMLInputElement>("offlineText");

onMounted(() => {
    document.addEventListener("openSettings", onSettingsOpened);

    loadSettings();
});

function onSettingsOpened() {
    isOpen.value = true;
    loadSettings();
}

function loadSettings() {
    settingDefaultTime.value = localStorage.getItem("defaultTime") ?? defaultSettings.defaultTime;
    settingDefaultOfflineText.value = localStorage.getItem("defaultOfflineText") ?? defaultSettings.defaultOfflineText;
}

function handleRevertToDefault() {
    settingDefaultTime.value = defaultSettings.defaultTime;
    settingDefaultOfflineText.value = defaultSettings.defaultOfflineText;

    localStorage.setItem("defaultTime", defaultSettings.defaultTime);
    localStorage.setItem("defaultOfflineText", defaultSettings.defaultOfflineText);
}

function handleSaveSettings() {
    let newDefaultTime = defaultTimeInput.value?.value ?? defaultSettings.defaultTime;
    let newDefaultOfflineText = defaultOfflineText.value?.value ?? defaultSettings.defaultOfflineText;

    localStorage.setItem("defaultTime", newDefaultTime);
    localStorage.setItem("defaultOfflineText", newDefaultOfflineText);

    isOpen.value = false;
}
</script>

<template>
    <div class="settings-bg" v-if="isOpen">
        <div class="settings-window">
            <h1 class="settings-title">Settings</h1>
            <div class="setting-row">
                <span>Default time:</span>
                <input type="time" :value="settingDefaultTime" ref="time">
            </div>
            <div class="setting-row">
                <span>Default offline text:</span>
                <input type="text" :value="settingDefaultOfflineText" ref="offlineText">
            </div>

            <div class="settings-buttons">
                <button class="settings-btn red" v-on:click="handleRevertToDefault">Revert to default</button>
                <button class="settings-btn" v-on:click="handleSaveSettings">Save & close</button>
            </div>
            
            <span class="settings-info">Settings are saved in the local storage, if you clear your browser data they will be reset.</span>
        </div>
    </div>
</template>

<style scoped>
.settings-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
}

.settings-window {
    background-color: #17181d;
    border: 1px solid #272833;
    border-radius: 12px;
    padding: 4px 16px;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.settings-title {
    text-align: center;
    color: #8ab4f8;
    font-weight: 400;
}

.setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
    width: 100%;
}

.setting-row span {
    width: 50%
}

.settings-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 0;
    margin-top: 8px;
}

.settings-btn {
    padding: 8px;
    background-color: #2ea043;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    user-select: none;
}

.settings-btn:hover {
    background-color: #46bd54;
}

.settings-btn.red {
    background-color: #8d1810;
}

.settings-btn.red:hover {
    background-color: #b11f17;
}

.settings-info {
    color: #686868;
    font-size: 12px;
    margin-top: 8px;
    
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
</style>
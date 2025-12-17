<script setup lang="ts">
function onSettingsClicked() {
    document.dispatchEvent(new Event("openSettings"));
}
</script>

<template>
    <div class="navbar">
        <h2 class="nav-title">Stream Scheduler <span class="nav-version">v2</span></h2>
        <button class="nav-settings" v-on:click="onSettingsClicked">⚙ Settings</button>
    </div>
</template>

<style scoped>
.navbar {
    background-color: #17181d;
    border-bottom: 1px solid #272833;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
}

.nav-title {
    padding: 4px 16px;
    color: #bebdc9;
    font-size: 24px;
    font-weight: 500;
}

.nav-version {
    font-size: 14px;
    font-weight: 400;
    color: #9d9bff;
}

.nav-settings {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 4px 8px;
    margin-right: 10px;
    background-color: #2b2d3a;
    color: #fff;
    transition: background-color 0.2s ease;
    user-select: none;
    font-size: 16px;
    transition: background-color 0.2s ease;
}

.nav-settings:hover {
    background-color: #3a3d4a;
}
</style>
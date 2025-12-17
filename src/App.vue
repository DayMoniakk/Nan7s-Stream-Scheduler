<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import Day from './Components/Day.vue';
import Navbar from './Components/Navbar.vue';
import SettingsWindow from './Components/SettingsWindow.vue';
import { GetDayOfTheWeekByID, GetMonthByID } from './Lib/Utils';
import { generateSchedule, initScheduleManager, updateDayData } from './Lib/ScheduleManager';

const startDateInput = useTemplateRef<HTMLInputElement>("start-date-input");
const startDate = ref<Date>(new Date());
const isCopiedToClipboard = ref(false);
const hasErrorHappened = ref(false);

onMounted(() => {
  if (startDateInput.value) {
    startDateInput.value.value = startDate.value.toISOString().slice(0, 10);
  }

  initScheduleManager();
});

function handleStartDateChange() {
  if (!startDateInput.value) return;
  startDate.value = new Date(startDateInput.value!.value);

  initScheduleManager();
}

function getDayName(index: number): string {
  let targetDay = startDate.value.getDay() + (index - 1);
  if (targetDay < 1) targetDay += 7;
  if (targetDay > 7) targetDay -= 7;

  let name = GetDayOfTheWeekByID(targetDay);
  let month = GetMonthByID(startDate.value.getMonth() + 1);

  updateDayData(index, {
    dayName: name,
    monthName: month,
    dayNumber: startDate.value.getDate() + index - 1,
    date: new Date(startDate.value.getFullYear(), startDate.value.getMonth(), startDate.value.getDate() + index - 1)
  });

  return name + ", " + month + " " + (startDate.value.getDate() + index - 1);
}

function handleGenerateSchedule() {
  const isSuccess = generateSchedule();

  if (isSuccess) {
    isCopiedToClipboard.value = true;
    setTimeout(() => isCopiedToClipboard.value = false, 3000);
  }
  else {
    hasErrorHappened.value = true;
    setTimeout(() => hasErrorHappened.value = false, 3000);
  }
}
</script>

<template>
  <Navbar />
  <SettingsWindow />

  <div style="height: 44px"></div>

  <div class="element">
    <span>Start date:</span>
    <input class="start-date-input" type="date" ref="start-date-input" v-on:change="handleStartDateChange">
  </div>

  <div class="days-container" v-for="i in 7">
    <Day :dayIndex="i" :dayName="getDayName(i)" />
  </div>

  <button class="apply-btn" v-on:click="handleGenerateSchedule">Generate schedule</button>

  <Transition name="slide-fade">
    <span class="info clipboard" v-if="isCopiedToClipboard">Schedule copied to the clipboard!</span>
  </Transition>
  
  <Transition name="slide-fade">
    <span class="info error" v-if="hasErrorHappened">Internal error, check console for more details. (F12)</span>
  </Transition>
</template>

<style scoped>
.days-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
}

.apply-btn {
  margin: 20px auto;
  display: block;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  background-color: #2b2d3a;
  color: #fff;
  font-size: 18px;
  padding: 12px 24px;
  transition: background-color 0.2s ease;
}

.apply-btn:hover {
  background-color: #3f4253;
}

.element {
  text-align: center;
  background-color: #17181d;
  border: 1px solid #272833;
  border-radius: 12px;
  padding: 16px;
  margin: 14px auto;
  width: calc(100% - 20px);
  max-width: calc(900px - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.start-date-input {
  background: #22232b;
  color: #fff;
  border: 1px solid #2c2e3a;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: text;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(300px);
  opacity: 0;
}

.info {
  position: fixed;
  top: 44px;
  right: 0;
  padding: 10px;
  border-radius: 10px 0 0 10px;
}

.info.clipboard {
  background-color: #9d9bff71;
}

.info.error {
  background-color: #ff000071;
}
</style>

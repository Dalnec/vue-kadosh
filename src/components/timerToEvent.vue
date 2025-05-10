<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { intervalToDuration, isBefore } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

const countdown = ref({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

const limaTimeZone = "America/Lima";
const targetDateString = "2025-07-25T19:00:00";
const targetDateUTC = fromZonedTime(new Date(targetDateString), limaTimeZone);
let interval: ReturnType<typeof setInterval>;

const updateCountdown = () => {
    const now = new Date();
    const nowInLima = toZonedTime(now, limaTimeZone);

    if (isBefore(targetDateUTC, now)) {
        countdown.value = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        clearInterval(interval);
        return;
    }

    const duration = intervalToDuration({
        start: nowInLima,
        end: targetDateUTC
    });

    countdown.value = {
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0
    };
};


onMounted(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div>
      {{ countdown.months }}m {{ countdown.days }}d {{ countdown.hours }}h {{ countdown.minutes }}m {{ countdown.seconds }}s
    </div>
</template>

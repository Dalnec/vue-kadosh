<script setup lang="ts">

import ContentPage from "@/components/contentPage.vue";
import happyYoung from "@/assets/images/youngHappy.png";
import LocationEvent from "@/components/locationEvent.vue";
import TeamContent from "@/components/teamContent.vue";
import FooterPage from "@/components/footerPage.vue";
import AboutEvent from "@/components/aboutEvent.vue";
import TimerToEvent from "@/components/timerToEvent.vue";
import EventTime from "@/components/eventTime.vue";
import HeadContent from "@/components/headContent.vue";

</script>

<template>
    <main class="-mt-20">
        <div>
            <!--            <event-time/>-->
            <head-content/>
            <!--            <content-page gradient-mode="to top right" color-via="var(&#45;&#45;p-primary-100)" color-from="var(&#45;&#45;p-primary-400)"-->
            <!--                          color-to="var(&#45;&#45;p-primary-700)" :opacity="0.25" :url-image="portTarapoto">-->
            <!--                <template #bottom-description>-->
            <!--                    <event-time class="hidden md:flex"/>-->
            <!--                </template>-->
            <!--            </content-page>-->
        </div>
        <event-time/>
        <div class="flex w-full items-center justify-center py-10 font-extrabold bg-slate-950 text-2xl md:text-5xl">
            <timer-to-event/>
        </div>

        <content-page gradient-mode="to bottom right" color-via="var(--p-primary-100)" color-from="var(--p-primary-500)"
                      color-to="var(--p-primary-700)" :opacity="0.15" :url-image="happyYoung"/>

        <about-event id="about"/>

        <location-event id="location"/>

        <div class="flex w-full items-center justify-center py-10 text-center text-3xl font-info bg-slate-950 md:text-5xl">
            <div>
                KADOSH “Llamados a Santidad”
            </div>
        </div>
        <team-content id="team"/>
        <footer-page id="footer"/>
        <div class="fixed bottom-5 right-5">
            <img src="@/assets/images/logoPage.jpg" alt="xd" class="w-28 h-28 opacity-75 rounded-full">
        </div>

    </main>
</template>

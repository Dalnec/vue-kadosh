<script setup lang="ts">

import HeaderMenu from "@/components/headerMenu.vue";
import { storeActivities, storeChurches, storeDocumentType, storeKind, storePaymentMethod, storeRate } from "@/stores/generalInfoStore.ts";
import { onMounted } from "vue";

onMounted(async() => {
    await storeChurches().getDataChurches();
    await storeDocumentType().getDocumentType();
    await storePaymentMethod().getPaymentMethod();
    await storeActivities().getActivities();
    await storeRate().getRates();
    await storeKind().getKinds();
});

</script>

<template>
    <header-menu/>
    <router-view v-slot="{Component}">
        <component :is="Component" class=""/>
    </router-view>
    <Toast :position="'top-left'"/>
</template>

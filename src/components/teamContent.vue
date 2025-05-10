<script setup lang="ts">

import { ref } from "vue";
import concilio1 from "@/assets/images/concilio1.jpg";
import concilio2 from "@/assets/images/concilio2.jpg";
import concilio3 from "@/assets/images/presidents.jpg";

const dataTeam = ref([
    { name: "concilio1", image: concilio1 },
    { name: "concilio2", image: concilio2 },
    { name: "concilio3", image: concilio3 }
]);

const responsiveOptions = ref([
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 }
]);

</script>

<template>

    <Carousel :value="dataTeam" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" circular :autoplayInterval="2000">
        <template #item="slotProps">
            <div class="m-2 rounded border border-surface-200 dark:border-surface-700">
                <div class="">
                    <div class="relative mx-auto">
                        <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded"/>
                    </div>
                </div>
            </div>
        </template>
    </Carousel>
</template>

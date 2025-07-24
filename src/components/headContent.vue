<script setup lang="ts">
import { ref } from "vue";
import portTarapoto from "@/assets/images/portaidPicture.jpg";
import camp1 from "@/assets/images/CAMP 25 - 01.jpg";
import camp2 from "@/assets/images/CAMP 25 - 02.png";

const responsiveOptions = ref([
    {
        breakpoint: "1300px",
        numVisible: 4
    },
    {
        breakpoint: "575px",
        numVisible: 1
    }
]);

const images = ref([
    {
        itemImageSrc: portTarapoto,
        thumbnailImageSrc: portTarapoto,
        alt: "Description for Image 1",
        title: "Title 1"
    },
    {
        itemImageSrc: camp1,
        thumbnailImageSrc: camp1,
        alt: "Description for Image 1",
        title: "Title 1"
    },
    {
        itemImageSrc: camp2,
        thumbnailImageSrc: camp2,
        alt: "Description for Image 1",
        title: "Title 1"
    }
]);
</script>

<template>
    <Galleria :value="images" :numVisible="5" :showThumbnails="false" :showIndicators="false" :responsiveOptions auto-play circular
              :transition-interval="5000">
        <template #item="{item}">
            <img :src="item?.itemImageSrc" :alt="item?.alt" class="w-full h-[600px] object-cover md:object-contain"/>
        </template>
    </Galleria>
</template>

<script setup lang="ts">

const props = defineProps({
    imgAccount: { required: false, type: String, default: "" },
    numberAccount: { required: true, type: String, default: "" },
    nameAccount: { required: true, type: String, default: "" }
});

</script>

<template>
    <div class="flex gap-2 items-center">
        <img :src="`${props.imgAccount}`" :alt="props.nameAccount" class="h-16 w-16 rounded-lg">
        <span class="text-2xl font-bold"> {{ props.numberAccount }}</span>
    </div>
</template>

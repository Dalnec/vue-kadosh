<script setup lang="ts">

const props = defineProps({
    label: { type: String, required: false, default: "" },
    cols: { type: String, required: false, default: "1" },
    hideLabel: { type: Boolean, required: false, default: false },
    forLabel: { type: String, required: false, default: "" },
    mark: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
    error: { type: String, required: false, default: null },
    colsPro: { type: String, required: false, default: "" }
});
</script>

<template>
    <div :class="colsPro ? colsPro : `max-cols-${cols}`">
        <label :for="props.forLabel" class="label-size" v-if="!hideLabel">
            {{ props.label }}
            <span class="ml-1 text-red-500" v-if="props.mark">*</span>
        </label>
        <slot/>
        <small class="error-required" v-if="!hideError">{{ error }}</small>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import toastEvent from "@/composable/toastEvent.ts";
import type { PaymentMethod } from "@/stores/interfaceActivities.ts";

const props = withDefaults(defineProps<PaymentMethod>(),
    { account: "", active: true, cci: null, description: "", icon: "", id: null }
);

const { copy } = useClipboard();

const copyToClipboard = async() => {
    const baseText = `Número de cuenta ${ props.description }: ${ props.account }`;
    const fullText = props.cci ? `${ baseText }\nCCI: ${ props.cci }` : baseText;
    await copy(fullText);
    toastEvent({ severity: "success", summary: "Copiado", message: "Datos copiados al portapapeles", life: 2000 });
};
</script>

<template>
    <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
            <img :src="`${props.icon}`" :alt="props.description" class="h-16 w-16 rounded-lg">
            <div>
                <p class="text-2xl font-bold"> {{ props.account }}</p>
                <p> {{ props.cci }}</p>
            </div>
        </div>
        <Button size="large" v-tooltip.bottom="'Añadir al portapapeles'" @click="copyToClipboard" v-if="props.account">
            <template #icon>
                <i-material-symbols-content-copy/>
            </template>
        </Button>
    </div>
</template>

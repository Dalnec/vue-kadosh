<script setup lang="ts">

import { ref } from "vue";
import { useMembersStore } from "@/stores/storeMembers";
import Drawer from "primevue/drawer";
import CardsInfoMember from "@/components/cardsInfoMember.vue";
import routes from "@/router/routes.ts";
import { useRoute } from "vue-router";
import { storePriceRate } from "@/stores/generalInfoStore.ts";

const visibleDrawer = ref(false);
const membersStoreOptions = useMembersStore();

const addMoreMembers = async() => {
    visibleDrawer.value = false;
    await routes.push({ name: "newRegister" });
};

defineEmits([ "onClickCard" ]);
defineExpose({ visibleDrawer });

</script>

<template>
    <Drawer v-model:visible="visibleDrawer" dismissable position="right" class="!w-full md:!w-[30rem]">
        <template #header>
            <div>
                <p class="p-card-title">
                    Lista de Personas
                </p>
                <p class="p-card-subtitle">
                    {{ membersStoreOptions.membersData.length }} Persona(s) registradas
                </p>
            </div>
        </template>
        <div class="grid space-y-2">
            <cards-info-member v-for="data in  membersStoreOptions.membersData" :key="data.doc_num" :birthdate="data.birthdate"
                               :doc_num="data.doc_num" :church="data.church" :doc-type="data.documenttype" :gender="data.gender"
                               :kind="data.kind" :names="data.names" :lastnames="data.lastnames" :phone="data.phone"
                               @click="$emit('onClickCard', (data))" :status="data.status"/>
        </div>
        <template #footer>
            <p class="text-xl mb-2">
                Total por pagar: <span class="font-bold"> S/ {{ storePriceRate().calculateRate() }}</span>
            </p>
            <div class="align-buttons-card-footer">
                <Button label="Agregar más" severity="contrast" @click="addMoreMembers()" fluid>
                    <template #icon>
                        <i-material-symbols-list-alt-add/>
                    </template>
                </Button>
                <Button label="Pagar" @click="routes.push({name:'payEvent'})" fluid v-if="useRoute().name !== 'payEvent'">
                    <template #icon>
                        <i-ic-baseline-payments/>
                    </template>
                </Button>
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">

import RegisterMembers from "@/components/registerMembers.vue";
</script>

<template>
    <Card>
        <template #title>
            Formulario de Inscripción
        </template>
        <template #subtitle>
            Ingrese los datos correspondientes
        </template>
        <template #content>
            <register-members/>
        </template>
    </Card>
</template>

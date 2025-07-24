<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "primevue";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const w = globalThis as unknown as Window;
const toast = useToast();

const handleScroll = () => {
    isScrolled.value = w.scrollY > 50;
};

onMounted(() => {
    w.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    w.removeEventListener("scroll", handleScroll);
});

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const menuItems = [
    { currentPage: "#about", label: "¿De qué se trata?" },
    // { currentPage: "", label: "Agenda" },
    { currentPage: "#team", label: "Nuestro equipo" },
    { currentPage: "#location", label: "Ubicanos" }
];

const specialItem = { label: "Inscríbete", special: true };

const onInscriptions = () => {
    toast.add({ severity: "warn", life: 10000, summary: "Las Inscripciones por este medio están inactivas" });
};

</script>

<template>
    <header class="sticky top-0 h-20 py-2 transition-colors duration-300 z-50" :class="isScrolled ? 'bg-slate-950/70' : 'bg-slate-950/50'">
        <nav class="container mx-auto flex items-center justify-between">
            <!-- Logo -->
            <router-link to="/">
                <div aria-description="header logo business" class="flex justify-center">
                    <img src="../assets/images/kadosh.png" alt="business logo" class="h-16"/>
                </div>
            </router-link>
            <!-- Botón de menú móvil (visible solo en móviles) -->
            <button class="block p-2 md:hidden" @click="toggleMobileMenu" aria-label="Toggle menu">
                <svg class="h-6 w-6" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            <!-- Menú de navegación en resoluciones grandes -->
            <ul class="hidden items-center space-x-2 md:flex">
                <li v-for="(item, index) in menuItems" :key="index" class="items-header">
                    <router-link :to="{ path:'/', hash: item.currentPage }">
                        <a aria-description="items-header">{{ item.label }}</a>
                    </router-link>
                </li>
                <Button @click="onInscriptions" class="bg-primary-emphasis" :label="specialItem.label" size="large">
                    <!--                    <router-link to="/suscribe" class="flex items-center rounded bg-amber-500 px-4 py-1 text-xl font-bold uppercase">-->
                    {{ specialItem.label }}
                    <!--                    </router-link>-->
                </Button>
            </ul>
        </nav>
        <!-- Menú móvil desplegable con transición (visible solo en móviles) -->
        <transition name="slide-fade">
            <div v-if="isMobileMenuOpen" class="mt-2 md:hidden max-h-[50vh] overflow-y-auto">
                <ul class="flex flex-col p-4 space-y-2" :class="isScrolled ? 'bg-slate-950/70' : 'bg-slate-950/80'">
                    <li v-for="(item, index) in menuItems" :key="index" class="items-header">
                        <router-link :to="{ path:'/', hash: item.currentPage }">
                            <a aria-description="items-header">{{ item.label }}</a>
                        </router-link>
                    </li>
                    <Button @click="onInscriptions" class="bg-primary-emphasis" :label="specialItem.label" size="large">
                        <!--                        <router-link to="/suscribe" class="flex items-center rounded bg-amber-500 px-4 py-1 text-xl font-bold uppercase">-->
                        {{ specialItem.label }}
                        <!--                        </router-link>-->
                    </Button>
                </ul>
            </div>
        </transition>
    </header>
</template>

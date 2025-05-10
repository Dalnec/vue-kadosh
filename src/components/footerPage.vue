<script setup lang="ts">

const menuItems = [
    { currentPage: "#about", label: "¿De qué se trata?" },
    { currentPage: "#team", label: "Nuestro equipo" },
    { currentPage: "#location", label: "Ubicanos" }
];

</script>

<template>
    <footer class="bg-[#18171D] text-white py-10 px-4 md:px-20">
        <div class="flex flex-col items-start border-b border-gray-700 pb-10 md:flex-row md:items-center md:justify-between">
            <div class="mb-6 flex flex-col gap-10 md:mb-0 md:flex-row md:items-center">
                <img src="@/assets/images/jni.jpg" alt="JNI Logo" class="h-20 object-contain"/>
                <img src="@/assets/images/kadosh.png" alt="Iglesia Logo" class="h-16 object-contain"/>
            </div>
            <div class="mt-6 flex gap-4 md:mt-0">
                <a href="https://www.instagram.com/jni.dpno/" target="_blank">
                    <i-lineicons-instagram-original class="text-xl text-white pi pi-instagram"/>
                </a>
                <a href="https://www.facebook.com/share/1FxQT4cJvg/" target="_blank">
                    <i-ic-baseline-facebook class="text-xl text-white pi pi-facebook"/>
                </a>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-10 py-10 text-sm md:grid-cols-4">
            <div>
                <h3 class="mb-4 font-bold uppercase">JNI</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="hover:underline">Instagram</a></li>
                    <li><a href="#" class="hover:underline">NYI</a></li>
                    <li><a href="#" class="hover:underline">SAMNAZ</a></li>
                </ul>
            </div>
            <div>
                <h3 class="mb-4 font-bold uppercase">Kadosh</h3>
                <ul class="items-center space-y-2">
                    <li v-for="(item, index) in menuItems" :key="index">
                        <router-link :to="{ path:'/', hash: item.currentPage }">
                            <a aria-description="items-header">{{ item.label }}</a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="mb-4 font-bold uppercase">Links</h3>
                <ul class="space-y-2">
                    <router-link to="/suscribe" class="hover:underline">
                        Inscripción
                    </router-link>
                </ul>
            </div>
            <div>
                <h3 class="mb-4 font-bold uppercase">Contacto</h3>
                <p class="mb-4 flex items-start gap-2">
                    <i class="text-xl text-white pi pi-map-marker"></i>
                    <span>Jirón San Martín 2193 - Barrio Ancoallo, Tarapoto 220904, Perú.</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col items-center justify-between border-t border-gray-700 pt-6 text-xs md:flex-row">
            <p class="flex items-center gap-1">
                Powered by <span class="text-indigo-500"><a href="https://github.com/DanGosw?tab=repositories" target="_blank" class="flex items-center gap-x-2 hover:underline">DevRunner <i-mdi-github/> </a></span>
            </p>
            <p>© 2025 JNI SAM. Todos los derechos reservados</p>
        </div>

    </footer>
</template>

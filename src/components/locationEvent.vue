<script setup lang="ts">
import happyYoung from "@/assets/images/imgYoungs.jpg";

</script>

<template>
    <div class="grid w-full justify-items-center px-4 py-5 bg-slate-900">
        <div class="flex w-full flex-col items-center gap-6 md:flex-row relative">
            <!-- Mapa -->
            <div class="w-full md:w-1/2">
                <div class="relative w-full pb-80">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2161.8285207518816!2d-76.52832350263037!3d-6.418337654748869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b0a6151a39a883%3A0x7f4a0d609a4bf325!2sIE%20Mart%C3%ADn%20de%20la%20Riva%20y%20Herrera!5e0!3m2!1ses-419!2spe!4v1743916680502!5m2!1ses-419!2spe"
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                            class="absolute top-0 left-0 h-full w-full rounded-2xl"/>
                </div>
            </div>
            <!-- Texto con fondo y filtro -->
            <div class="w-full md:w-1/2 text-white bg-cover bg-center bg-no-repeat rounded-2xl"
                 :style="`background-image: url(${happyYoung})`">
                <div class="backdrop-blur-sm bg-black/40 p-6 rounded-2xl">
                    <div class="text-center text-2xl font-info md:text-5xl mb-4">
                        ¿Dónde?
                    </div>
                    <span class="block text-center text-2xl">
                        El congreso se realizará en Perú, en la ciudad de Lamas, conocida también como la “Capital Folclórica de la Amazonía 
                        Peruana” por su clima tropical, sus destinos históricos y turísticos maravillosos. <br/><br/>
                        Estaremos viviendo toda esta experiencia de <span class="text-primary-500">Kadosh</span> 
                        en la “I.E Martin de la Riva y Herrera”. <br/> Jirón San Martín 2193 - Barrio Ancoallo, Lamas 220501, Perú.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

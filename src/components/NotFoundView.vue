<script setup lang="ts">

import router from "../router/routes.ts";

const onBackHome = () => router.push({ name: "layout" });

</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
         style="background-image: url('https://wallpapershome.com/images/pages/pic_h/27258.jpg')">
        <div class="mx-2 max-w-md rounded-lg bg-white bg-opacity-90 p-4 text-center shadow-lg text-surface-900 dark:bg-surface-900 dark:text-surface-100">
            <div class="my-2 flex items-center justify-center text-9xl font-bold text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="208" height="140" viewBox="0 0 208 140">
                    <path d="M145.818 114.581C170.23 90.0509 170.23 50.2797 145.818 25.7496C121.405 1.21942 81.8253 1.21941 57.4131 25.7495C33.0009 50.2797 33.0009 90.0509 57.4131 114.581C81.8253 139.111 121.405 139.111 145.818 114.581Z"
                          class="fill-primary-800 dark:fill-surface-700"/>
                    <path
                            d="M16.5958 89.5536C5.28379 89.5536 0.765625 85.007 0.765625 75.0403V44.3603C0.765625 42.1736 1.72103 41.2136 3.89718 41.2136H17.3787C19.5548 41.2136 20.5102 42.1736 20.5102 44.3603V68.3136C20.5102 70.147 21.5519 71.287 23.2105 71.287H31.2981V44.3603C31.2981 42.1736 32.2535 41.2136 34.4297 41.2136H47.8249C50.0011 41.2136 50.9565 42.1736 50.9565 44.3603V101.007C50.9565 103.194 50.0011 104.154 47.8249 104.154H34.4297C32.2535 104.154 31.2981 103.194 31.2981 101.007V89.5536H16.5958Z"
                            class="fill-primary-400 dark:fill-surface-100"/>
                    <path
                            d="M172.881 89.5536C161.569 89.5536 157.051 85.007 157.051 75.0403V44.3603C157.051 42.1736 158.006 41.2136 160.182 41.2136H173.664C175.84 41.2136 176.795 42.1736 176.795 44.3603V68.3136C176.795 70.147 177.837 71.287 179.489 71.287H187.577V44.3603C187.577 42.1736 188.532 41.2136 190.708 41.2136H204.104C206.28 41.2136 207.235 42.1736 207.235 44.3603V101.007C207.235 103.194 206.28 104.154 204.104 104.154H190.708C188.532 104.154 187.577 103.194 187.577 101.007V89.5536H172.874H172.881Z"
                            class="fill-primary-400 dark:fill-surface-100"/>
                    <path
                            d="M161.683 4.86732C160.515 3.80065 146.198 17.6673 126.433 38.6673C119.759 33.5807 111.439 30.554 102.416 30.554C80.4288 30.554 62.6016 48.4673 62.6016 70.5607C62.6016 81.114 66.6818 90.7007 73.3231 97.8473C56.1859 117.907 45.2188 132.047 46.3268 133.054C47.9589 134.534 75.1012 107.041 106.961 71.6407C138.813 36.2407 163.315 6.34065 161.683 4.86065V4.86732Z"
                            class="fill-primary-400 dark:fill-surface-100"/>
                    <path
                            d="M109.845 74.2741C99.7803 85.4607 90.1203 95.7941 81.5352 104.634C87.6058 108.401 94.7513 110.574 102.408 110.574C124.395 110.574 142.222 92.6607 142.222 70.5674C142.222 61.4941 139.21 53.1274 134.141 46.4141C126.916 54.9874 118.689 64.4407 109.838 74.2741H109.845Z"
                            class="fill-primary-400 dark:fill-surface-100"/>
                    <path
                            d="M106.282 39.2212C107.45 42.4012 104.053 46.5879 98.6921 48.5812C93.3313 50.5745 88.0369 49.6145 86.8626 46.4412C85.6949 43.2612 89.0918 39.0745 94.4526 37.0812C99.8134 35.0879 105.108 36.0479 106.282 39.2212Z"
                            class="fill-primary-800 dark:fill-surface-700"/>
                    <path
                            d="M79.0518 54.827C80.8106 54.827 82.2364 53.3943 82.2364 51.627C82.2364 49.8597 80.8106 48.427 79.0518 48.427C77.293 48.427 75.8672 49.8597 75.8672 51.627C75.8672 53.3943 77.293 54.827 79.0518 54.827Z"
                            class="fill-primary-800 dark:fill-surface-700"/>
                    <path
                            d="M134.26 62.5672C135.14 62.5672 135.853 61.8508 135.853 60.9672C135.853 60.0835 135.14 59.3672 134.26 59.3672C133.381 59.3672 132.668 60.0835 132.668 60.9672C132.668 61.8508 133.381 62.5672 134.26 62.5672Z"
                            class="fill-primary-800 dark:fill-surface-700"/>
                </svg>
            </div>
            <h1 class="my-3 text-4xl font-bold text-surface-800 dark:text-surface-200">Oops! Pagina no encontrada</h1>
            <p class="my-4 text-lg text-surface-800 dark:text-surface-300">Parece que la página que buscas se ha ido de aventura.
                No te preocupes, te ayudaremos a encontrar el camino de vuelta a casa.
            </p>
            <Button fluid @click="onBackHome">Regresar</Button>
        </div>
    </div>
</template>

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                IconsResolver(),
                PrimeVueResolver()
            ]
        }),
        Icons({ compiler: "vue3", autoInstall: true })
    ],
    server: {
        host: true,
        port: 5160
    },
    resolve: {
        alias: [
            { find: "@", replacement: fileURLToPath(new URL("src/", import.meta.url)) }
        ]
    }
});

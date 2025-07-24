import { createRouter, createWebHistory } from "vue-router";
// import { useMembersStore } from "@/stores/storeMembers.ts";
// import toastEvent from "@/composable/toastEvent.ts";

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/", name: "layout", component: () => import("@/components/bodyPage.vue"),
            meta: {}
        },
        // {
        //     path: "/suscribe", name: "suscribe", component: () => import("@/components/registersCard.vue"),
        //     meta: {}
        // },
        // {
        //     path: "/pay-event", name: "payEvent", component: () => import("@/components/payEventView.vue"),
        //     beforeEnter: async() => {
        //         const membersStoreOptions = useMembersStore();
        //         if (membersStoreOptions.membersData.length === 0) {
        //             toastEvent({ severity: "error", summary: "Error al pagar", message: "Agregue una persona al menos" });
        //             await routes.push({ name: "suscribe" });
        //             return;
        //         }
        //     }
        // },
        { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("@/components/NotFoundView.vue") },
        // { path: "/:catchAll(.*)", name: "Page not found", redirect: "/" }
    ],
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth"
            };
        }
        return { top: 0 };
    }
});

export default routes;
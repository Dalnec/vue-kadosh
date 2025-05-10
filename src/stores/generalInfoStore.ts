import { defineStore } from "pinia";
import { Api } from "@/api/connection.ts";
import { useMembersStore } from "@/stores/storeMembers.ts";

export const storeChurches = defineStore("storeChurches", {
    state: () => ({
        churches: [] as { id: number, description: string, active: boolean }[]
    }),
    actions: {
        async getDataChurches() {
            const { response } = await Api.Get({ route: "church", params: { page_size: 666 } });
            if (response && response.status === 200) {
                this.churches = response.data.results;
            }
        }
    }
});

export const storeDocumentType = defineStore("storeDocumentType", {
    state: () => ({
        documentType: []
    }),
    actions: {
        async getDocumentType() {
            const { response } = await Api.Get({ route: "documentType", params: { page_size: 666 } });
            if (response && response.status === 200) {
                this.documentType = response.data.results;
            }
        }
    }
});

export const storePaymentMethod = defineStore("storePaymentMethod", {
    state: () => ({
        paymentMethod: [] as { id: null | number, description: string, icon: string, account: string, active: boolean }[]
    }),
    actions: {
        async getPaymentMethod() {
            const { response } = await Api.Get({ route: "paymentMethod", params: { page_size: 666 } });
            if (response && response.status === 200) {
                this.paymentMethod = response.data.results;
            }
        }
    }
});

export const storeActivities = defineStore("storeActivities", {
    state: () => ({
        activities: [] as {
            id: number, created: string, modified: string, title: string, description: string,
            location: string, start_date: string, end_date: string, is_active: boolean
        }[]
    }),
    actions: {
        async getActivities() {
            const { response } = await Api.Get({ route: "activity" });
            if (response && response.status === 200) {
                this.activities = response.data;
            }
        }
    }
});

export const storeRate = defineStore("storeRate", {
    state: () => ({
        rate: [] as { id: number, created: string, modified: string, description: string, price: string, active: boolean, selected: boolean }[]
    }),
    actions: {
        async getRates() {
            const { response } = await Api.Get({ route: "tarifa", params: { page_size: 666 } });
            if (response && response.status === 200) {
                this.rate = response.data.results;
            }
        }
    }
});

export const storePriceRate = defineStore("storePriceRate", {
    state: () => ({
        totalPrice: 0
    }),
    actions: {
        calculateRate() {
            const dataRate = storeRate().rate.find(rt => rt.selected);
            const totalMembers = useMembersStore().membersData.length;
            if ( !dataRate) return;
            return this.totalPrice = parseFloat(dataRate.price) * totalMembers;
        }
    }
});

export const storeKind = defineStore("storeKind", {
    state: () => ({
        kind: [] as { id: number, description: string, active: boolean }[]
    }),
    actions: {
        async getKinds() {
            const { response } = await Api.Get({ route: "kind" });
            if (response && response.status === 200) {
                this.kind = response.data;
            }
        }
    }
});

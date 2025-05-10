import { ref } from "vue";
import { defineStore } from "pinia";
import type { InterfaceMembers } from "@/composable/interfaceMembers.ts";
import toastEvent from "@/composable/toastEvent.ts";
import routes from "@/router/routes.ts";

export const useMembersStore = defineStore("membersStore", () => {
    const membersData = ref<InterfaceMembers[]>([]);

    const addNewMembers = (members: InterfaceMembers, resetFilters: () => void, isClickCard: boolean) => {
        const index = membersData.value.findIndex(dt => dt.doc_num === members.doc_num);

        if (index !== -1 && !isClickCard) {
            toastEvent({
                closable: true, severity: "error", summary: "Error al guardar.",
                message: `La persona ${ members.names } ${ members.lastnames } ya fue agregada.`
            });
            return;
        } else if (isClickCard && index !== -1) {
            membersData.value[index] = { ...members };

            toastEvent({
                severity: "info", summary: "Actualizado",
                message: `${ members.names } ${ members.lastnames } fue actualizado correctamente.`
            });

            resetFilters();
        } else {
            toastEvent({
                severity: "success", summary: "¡Éxito!", message: `${ members.names } ${ members.lastnames } se agregó correctamente.`
            });

            membersData.value.push(members);
            resetFilters();
        }
    };

    const removeMembers = async(members: InterfaceMembers): Promise<void> => {
        membersData.value = membersData.value.filter(dt => dt.doc_num !== members.doc_num);
        toastEvent({
            severity: "success", summary: "!Eliminado¡", message: `${ members.names } ${ members.lastnames } se eliminó de la lista`
        });
        if (membersData.value.length === 0) {
            toastEvent({ severity: "warn", summary: "!Error¡", message: `La lista esta vacía, agregue nuevos datos` });
            await routes.push({ name: "suscribe" });
        }
    };

    return { membersData, addNewMembers, removeMembers };
});

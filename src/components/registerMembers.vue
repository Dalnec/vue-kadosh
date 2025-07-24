<script setup lang="ts">

import { computed, ref, watch } from "vue";
import { useMembersStore } from "@/stores/storeMembers.ts";
import type { InterfaceMembers } from "@/composable/interfaceMembers.ts";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import toastEvent from "@/composable/toastEvent.ts";
import FormItem from "@/components/formItem.vue";
import DrawerMembersSaved from "@/components/drawerMembersSaved.vue";
import { storeChurches, storeDocumentType, storeKind } from "@/stores/generalInfoStore.ts";
import { type DataDNI, getDataReniec, type MemberExist } from "@/composable/getDataReniec.ts";

const refDrawerMembersSaved = ref();
const loadingSearch = ref(false);
const membersStoreOptions = useMembersStore();
const isClickCard = ref(false);
const wasDniChecked = ref(false);

const props = defineProps({
    closeModal: { default: () => ({}), required: false, type: Function },
    formData: { default: {} as InterfaceMembers, required: false, type: Object },
    refreshData: { default: () => ({}), required: false, type: Function }
});

const formMembers = ref<InterfaceMembers>({
    church: null, doc_num: "", documenttype: 1, gender: "", kind: null, lastnames: "", names: "", phone: "", status: true, age: null
});

const validationSchema = ref(yup.object({
    // birthdate: yup.string().required("Agrega una fecha valida"),
    church: yup.string().required("Seleccione una iglesia"),
    documenttype: yup.string().required("Seleccione un tipo de identificación"),
    doc_num: yup.string().required("Agregue un DNI"),
    gender: yup.string().required("Seleccione un género"),
    kind: yup.string().required("Seleccione a donde pertenece"),
    lastnames: yup.string().required("Agregue sus apellidos"),
    names: yup.string().required("Agregue sus nombres"),
    phone: yup.string().required("Añada un teléfono valido")
}));

const { handleReset, handleSubmit, errors, setValues } = useForm<InterfaceMembers>({ validationSchema, initialValues: formMembers.value });

// const { value: birthdate, handleBlur: birthdateHandle } = useField<Date | null>("birthdate");
const { value: church, handleBlur: churchHandle } = useField<string>("church");
const { value: doc_num, handleBlur: doc_numHandle } = useField<string>("doc_num");
const { value: documenttype, handleBlur: documenttypeHandle } = useField<number>("documenttype");
const { value: gender, handleBlur: genderHandle } = useField<string>("gender");
const { value: kind, handleBlur: kindHandle } = useField<number>("kind");
const { value: lastnames, handleBlur: lastnamesHandle } = useField<string>("lastnames");
const { value: names, handleBlur: namesHandle } = useField<string>("names");
const { value: phone, handleBlur: phoneHandle } = useField<string>("phone");
const { value: age } = useField<number | null>("age");

const optionsDocuments = computed(() => storeDocumentType().documentType);
const optionsChurches = computed(() => storeChurches().churches);
const optionsKinds = computed(() => storeKind().kind);

const addDataFromReniec = async(): Promise<void> => {
    loadingSearch.value = true;
    wasDniChecked.value = false;

    const dataConsult = await getDataReniec(doc_num.value);

    if ( !dataConsult || !dataConsult.success) {
        loadingSearch.value = false;
        wasDniChecked.value = true;
        toastEvent({
            severity: "warn", summary: "DNI no encontrado", message: dataConsult?.message || "No se encontró información con ese DNI."
        });
        return;
    }

    const result = dataConsult.data;

    if ("doc_num" in result && "names" in result && "lastnames" in result) {
        const dataConsultDNI = result as MemberExist;
        // showMessage.value = true;
        setValues({
            names: dataConsultDNI.names, lastnames: `${ dataConsultDNI.lastnames }`, phone: dataConsultDNI.phone, kind: dataConsultDNI.kind,
            gender: dataConsultDNI.gender, church: dataConsultDNI.church
        }, false);
        // infoMessage.value = { dni: result.doc_num, names: `${ result.names } ${ result.lastnames }` };
    }

    if ("nombre_completo" in result) {
        const dataConsultDNI = result as DataDNI;
        setValues({
            names: dataConsultDNI.nombres, lastnames: `${ dataConsultDNI.apellido_paterno } ${ dataConsultDNI.apellido_materno }`
        }, false);
    }

    wasDniChecked.value = true;
    loadingSearch.value = false;
};

const saveNewMember = handleSubmit(async(values) => {
    if (documenttype.value === 1 && !wasDniChecked.value && !isClickCard.value) {
        toastEvent({ severity: "warn", summary: "Consulta pendiente", message: "Debes hacer la búsqueda por DNI antes de continuar." });
        return;
    }

    if ( !props.formData?.id) {
        membersStoreOptions.addNewMembers(values, clearDataForm, isClickCard.value);
        updateVisibilityDrawer();
    }

    isClickCard.value = false;
}, ({ errors }) => {
    const errorMessages = Object.entries(errors).map(([ field, message ]) => `${ field }: ${ message }`).join(", \n");
    toastEvent({ summary: "Campos requeridos: ", message: errorMessages, life: 5000 });
});

const onClickCardMember = (data: InterfaceMembers) => {
    setValues({ ...data });
    isClickCard.value = true;
};

const clearDataForm = () => {
    handleReset();
};

const updateVisibilityDrawer = () => refDrawerMembersSaved.value.visibleDrawer = true;

watch(doc_num, () => {
    wasDniChecked.value = false;
});

</script>

<template>
    <div class="mx-auto max-w-screen-sm align-items-form sm:px-6 md:px-8 lg:px-10">
        <FormItem label="Tipo de Documento" cols="12">
            <Select fluid v-model="documenttype" @blur="documenttypeHandle($event, true)" :options="optionsDocuments"
                    optionLabel="description" option-value="id" size="large" :disabled="isClickCard"/>
        </FormItem>
        <FormItem label="DNI" cols="12" :error="errors.doc_num">
            <InputGroup>
                <InputText fluid v-model="doc_num" @blur="doc_numHandle($event, true)" placeholder="Ingrese nro de DNI" v-key-filter.num
                           maxlength="8" :invalid="!!errors.doc_num" size="large" :disabled="isClickCard && !isClickCard"
                           @keyup.enter="addDataFromReniec"/>
                <Button label="Buscar" :disabled="isClickCard || loadingSearch" v-if="documenttype === 1" @click="addDataFromReniec"
                        :loading="loadingSearch">
                    <template #icon>
                        <i-material-symbols-database-search/>
                    </template>
                </Button>
            </InputGroup>
        </FormItem>
        <FormItem label="Nombres" cols="12" :error="errors.names">
            <InputText fluid v-model="names" @blur="namesHandle($event, true)" :invalid="!!errors.names" size="large"
                       :disabled="!wasDniChecked && documenttype === 1"/>
        </FormItem>
        <FormItem label="Apellidos" cols="12" :error="errors.lastnames">
            <InputText fluid v-model="lastnames" @blur="lastnamesHandle($event, true)" :invalid="!!errors.lastnames" size="large"
                       :disabled="!wasDniChecked && documenttype === 1"/>
        </FormItem>
        <FormItem label="Género" cols="12" :error="errors.gender">
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2">
                    <RadioButton v-model="gender" inputId="gender1" name="gender" value="M" @blur="genderHandle($event, true)"
                                 :invalid="!!errors.gender"/>
                    <label for="gender1">Masculino</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="gender" inputId="gender2" name="gender" value="F" @blur="genderHandle($event, true)"
                                 :invalid="!!errors.gender"/>
                    <label for="gender2">Femenino</label>
                </div>
            </div>
        </FormItem>
        <!--        <FormItem label="F. de Nacimiento" cols="6" :error="errors.gender">-->
        <!--            <DatePicker fluid v-model="birthdate" @blur="birthdateHandle(undefined, true)" :invalid="!!errors.birthdate" size="large"-->
        <!--                        date-format="d/m/yy"/>-->
        <!--        </FormItem>-->
        <FormItem label="Edad" cols="12">
            <InputNumber fluid v-model="age" size="large"/>
        </FormItem>
        <FormItem label="Celular" cols="12" :error="errors.phone">
            <InputText fluid v-model="phone" @blur="phoneHandle($event, true)" maxlength="9" v-key-filter.num :invalid="!!errors.phone"
                       size="large"/>
        </FormItem>
        <FormItem label="¿Perteneces a alguna iglesia?" cols="12" :error="errors.kind">
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2" v-for="kindData in optionsKinds">
                    <RadioButton v-model="kind" :inputId="kindData.description" :name="kindData.description" :value="kindData.id"
                                 :invalid="!!errors.kind"
                                 size="large" @blur="kindHandle($event, true)"/>
                    <label :for="kindData.description">{{ kindData.description }}</label>
                </div>
            </div>
        </FormItem>
        <FormItem label="Iglesia" cols="12" :error="errors.church">
            <Select :options="optionsChurches" fluid v-model="church" @blur="churchHandle($event, true)" filter show-clear size="large"
                    :invalid="!!errors.church" reset-filter-on-clear reset-filter-on-hide auto-filter-focus optionLabel="description"
                    option-value="id"/>
        </FormItem>

        <div class="max-cols-4">
            <Button label="Ver Lista" severity="secondary" @click="updateVisibilityDrawer"
                    v-if="membersStoreOptions.membersData.length >= 1" fluid>
                <template #icon>
                    <i-material-symbols-list-alt-check/>
                </template>
            </Button>
        </div>

        <div class="max-cols-4">
            <Button label="Cancelar" severity="warn" fluid @click="clearDataForm()">
                <template #icon>
                    <i-material-symbols-tab-close/>
                </template>
            </Button>
        </div>
        <div class="max-cols-4">
            <Button :label=" isClickCard ? 'Editar' :'¡Agregar!'" @click="saveNewMember()" fluid>
                <template #icon>
                    <i-material-symbols-sync-saved-locally/>
                </template>
            </Button>
        </div>
    </div>
    <drawer-members-saved ref="refDrawerMembersSaved" @on-click-card="onClickCardMember"/>
</template>

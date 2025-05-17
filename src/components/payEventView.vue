<script setup lang="ts">

import { useMembersStore } from "@/stores/storeMembers.ts";
import DrawerMembersSaved from "@/components/drawerMembersSaved.vue";
import { computed, ref, onMounted } from "vue";
import { Api } from "@/api/connection.ts";
import type { FileUploadSelectEvent } from "primevue";
import FormItem from "@/components/formItem.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import toastEvent from "@/composable/toastEvent.ts";
import { fileToBase64 } from "@/composable/convertImageToUpload.ts";
import { storeActivities, storePaymentMethod, storePriceRate, storeRate } from "@/stores/generalInfoStore.ts";
import ViewPaymentMethods from "@/components/viewPaymentMethods.vue";
import router from "@/router/routes.ts";
import type { PaymentMethod } from "@/stores/interfaceActivities.ts";

type VoucherImageType = { file: File; objectURL: string; };

const refDrawerMembersSaved = ref();
const loadingSave = ref(false);
const updateVisibilityDrawer = () => refDrawerMembersSaved.value.visibleDrawer = true;
const storeDataMembers = useMembersStore();
const fileAccept = ref<string>("image/png, image/jpeg, image/jpg");
const refVoucherImage = ref();
const dataForViewPayment = ref<PaymentMethod>({ account: "", active: true, cci: null, description: "", icon: "", id: null });
const usePaymentMethodStore = storePaymentMethod();
const useStoreTotalRate = storePriceRate();
const useStoreActivities = storeActivities();

const validationSchema = ref(yup.object({
    paymentmethod: yup.number().required("Seleccione el método de pago"),
    voucherfile: yup.object().shape({
        file: yup.mixed().required("Img. requerida"), objectURL: yup.string().required("Img. requerida")
    }).nullable()
}));

const { handleSubmit, errors, resetForm } = useForm<{ voucherfile: VoucherImageType | {}, paymentmethod: null | number, tarifa: number }>({
    validationSchema, initialValues: { voucherfile: {}, paymentmethod: null }
});

const { value: voucherfile, setValue: setVoucherImage } = useField<VoucherImageType | {}>("voucherfile");
const { value: paymentmethod } = useField<number | null>("paymentmethod");
const { value: tarifa, setValue: setRate } = useField<number | null>("tarifa");

const setVoucherImageFile = (file: File | null) => {
    if (file) voucherfile.value = { file, objectURL: URL.createObjectURL(file) };
    else voucherfile.value = {};
};

function isVoucherImage(obj: unknown): obj is VoucherImageType {
    return (typeof obj === "object" && obj !== null && "file" in obj && obj.file instanceof File && "objectURL" in obj && typeof obj.objectURL === "string");
}

const saveAllMembers = handleSubmit(async() => {
    try {

        loadingSave.value = true;
        const dataActivity = useStoreActivities.activities.find(act => act.is_active);

        const payload: Record<string, any> = {
            activity: dataActivity?.id,
            voucheramount: useStoreTotalRate.calculateRate(),
            tarifa: tarifa.value,
            paymentmethod: paymentmethod.value,
            people: storeDataMembers.membersData
        };
        if (isVoucherImage(voucherfile.value)) payload.voucherfile = await fileToBase64(voucherfile.value.file);

        const { response } = await Api.Post({ route: "inscription-groups/register-group", data: payload });

        if (response && response?.status === 201) {
            toastEvent({ severity: "success", summary: `${ response.data.message }` });
            storeDataMembers.membersData = [];
            await router.push({ name: "suscribe" });
            refVoucherImage.value.remove();
            resetForm();
            loadingSave.value = false;
        } else {
            console.error("Fail", response);
            loadingSave.value = false;
        }
    } catch (error) {
        loadingSave.value = false;
        console.log(error);
    }
}, () => {
    refVoucherImage.value.remove();
    toastEvent({ severity: "error", summary: "Error al guardar", message: "Por favor, agregue la imagen." });
});

const filterPaymentMethods = computed(() => {
    return usePaymentMethodStore.paymentMethod.filter(pm => pm.id !== 1 && pm.description !== "EFECTIVO" && pm.active);
});

const onValueSelectPayment = (id: number) => {
    const found = filterPaymentMethods.value.find(pm => pm.id === id);
    if ( !found) return;
    dataForViewPayment.value = found;
};

onMounted(() => {
    const dataRate = storeRate().rate.find(rt => rt.selected);
    if (dataRate) {
        setRate(dataRate?.id);
    }
});

</script>

<template>
    <Card class="h-full" :style="{ height: 'calc(100vh - 100px)' }">
        <template #title>
            Formulario de Pago
        </template>
        <template #subtitle>
            Revise los datos antes de pagar
        </template>
        <template #content>
            <div class="mx-auto max-w-screen-sm align-items-form sm:px-6 md:px-8 lg:px-10">
                <div class="max-cols-12">
                    <p class="text-2xl">
                        Persona(s) agregadas: {{ storeDataMembers.membersData.length }}
                    </p>
                </div>
                <div class="rounded-md bg-slate-300 p-4 text-center text-2xl font-bold max-cols-12">
                    Total S/. {{ useStoreTotalRate.calculateRate() }}
                </div>
                <FormItem label="Método de pago" cols="12" :error="errors.paymentmethod">
                    <Select v-model="paymentmethod" :options="filterPaymentMethods" optionLabel="description" option-value="id" fluid
                            size="large" @value-change="(value) => onValueSelectPayment(value)"/>
                </FormItem>
                <FormItem cols="12" hide-error hide-label v-if="paymentmethod">
                    <view-payment-methods :description="dataForViewPayment.description" :account="dataForViewPayment.account"
                                          :icon="dataForViewPayment.icon" :cci="dataForViewPayment.cci" :id="dataForViewPayment.id"
                                          :active="dataForViewPayment.active"/>
                </FormItem>
                <FormItem label="Voucher de pago" cols="12" :error="errors.voucherfile">
                    <FileUpload name="voucher" :accept="fileAccept" :max-file-size="1000000" :file-limit="1" class="w-full"
                                ref="refVoucherImage" @select="(files:FileUploadSelectEvent)=> setVoucherImageFile(files.files[0])"
                                :show-cancel-button="false" @remove="setVoucherImage({})" :show-upload-button="false" input-id="voucherfile"
                                invalid-file-size-message="Peso de imagen invalido" invalid-file-limit-message="1 imagen máximo.">
                    </FileUpload>
                </FormItem>

                <div class="max-cols-4">
                    <Button label="Ver Lista" severity="secondary" @click="updateVisibilityDrawer"
                            v-if="storeDataMembers.membersData.length >= 1" fluid>
                        <template #icon>
                            <i-material-symbols-list-alt-check/>
                        </template>
                    </Button>
                </div>

                <div class="max-cols-8">
                    <Button label="Enviar y Pagar" @click="saveAllMembers()" fluid :disabled="loadingSave" :loading="loadingSave">
                        <template #icon>
                            <i-material-symbols-sync-saved-locally/>
                        </template>
                    </Button>
                </div>
            </div>
            <drawer-members-saved ref="refDrawerMembersSaved"/>
        </template>
    </Card>
</template>

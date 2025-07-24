import { useDebounceFn } from "@vueuse/core";
import { Api } from "@/api/connection";
import toastEvent from "@/composable/toastEvent";

export interface InterfaceResponseDNI<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface DataDNI {
    numero: string;
    nombre_completo: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    codigo_verificacion: number;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    direccion_completa: string;
    ubigeo_reniec: string;
    ubigeo_sunat: string;
    ubigeo: string[];
}

export interface MemberExist {
    created: string;
    code: string;
    doc_num: string;
    names: string;
    lastnames: string;
    gender: string;
    birthdate: any;
    phone: string;
    email: any;
    status: boolean;
    kind: number;
    documenttype: number;
    documenttype_description: string;
    church: number;
    church_description: string;
    user: any;
}

const EMPTY_DNI: DataDNI = {
    apellido_materno: "", apellido_paterno: "", codigo_verificacion: 0, departamento: "", direccion: "", direccion_completa: "",
    distrito: "", nombre_completo: "", nombres: "", numero: "", provincia: "", ubigeo: [], ubigeo_reniec: "", ubigeo_sunat: ""
};

export const getDataReniec = useDebounceFn(async(consult: string): Promise<InterfaceResponseDNI<MemberExist | DataDNI>> => {
    if ( !consult) {
        return { success: false, message: "Agregue un número válido", data: { ...EMPTY_DNI } };
    }

    const isDNI = consult.length === 8;
    const isRUC = consult.length === 11;

    if ( !isDNI && !isRUC) {
        return { success: false, message: "Número inválido (Debe tener 8 o 11 dígitos)", data: { ...EMPTY_DNI } };
    }

    try {
        const { response } = await Api.Get({ route: `person/apiclient/${ consult }` });

        if ( !response.data.success) {
            return { success: false, message: "No se encontró información.", data: { ...EMPTY_DNI } };
        }

        if (response.data.message?.includes("encuentra")) {
            toastEvent({ summary: "Éxito", message: `Datos encontrados`, severity: "success" });
            return { success: true, message: response.data.message, data: response.data.data };
        }

        toastEvent({ summary: "Éxito", message: "Datos encontrados", severity: "success" });

        return { success: true, message: "Datos encontrados", data: response.data.data };
    } catch (error) {
        console.error("Error al consultar RENIEC:", error);
        return { success: false, message: "No se pudo obtener la información", data: { ...EMPTY_DNI } };
    }
}, 500);

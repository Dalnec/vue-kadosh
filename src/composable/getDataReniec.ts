import { useDebounceFn } from "@vueuse/core";
import { Api } from "@/api/connection";
import toastEvent from "@/composable/toastEvent";

export interface InterfaceResponseDNI {
    success: boolean;
    data: DataDNI;
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

const EMPTY_DNI: DataDNI = {
    apellido_materno: "", apellido_paterno: "", codigo_verificacion: 0, departamento: "", direccion: "", direccion_completa: "",
    distrito: "", nombre_completo: "", nombres: "", numero: "", provincia: "", ubigeo: [], ubigeo_reniec: "", ubigeo_sunat: ""
};

const handleError = (message: string) => {
    toastEvent({ summary: "Error", message });
    return { ...EMPTY_DNI };
};

export const getDataReniec = useDebounceFn(async(consult: string): Promise<DataDNI> => {
    if ( !consult) return handleError("Agregue un número válido");

    const isDNI = consult.length === 8;
    const isRUC = consult.length === 11;

    if ( !isDNI && !isRUC) return handleError("Número inválido (Debe tener 8 o 11 dígitos)");

    try {
        const { response } = await Api.Get({ route: `person/apiclient/${ consult }` });
        const data = response.data;

        if ( !data.success) return handleError("No se encontró información.");
        if (data.message && data.message.includes("existe")) {
            return handleError(`${ data.message } y fue agregado a la lista`);
        }

        if (isDNI) {
            toastEvent({ summary: "Éxito", message: "Datos encontrados", severity: "success" });
            return (data as InterfaceResponseDNI).data;
        }
    } catch (error) {
        console.error("Error al consultar RENIEC:", error);
        return handleError("No se pudo obtener la información");
    }

    return { ...EMPTY_DNI };
}, 500);

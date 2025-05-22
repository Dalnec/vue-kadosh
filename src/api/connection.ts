import toastEventBus from "primevue/toasteventbus";
import axios, { AxiosError, type AxiosResponse } from "axios";

let baseURL: string = import.meta.env.VITE_API_APP_URL;
let has_server_connection: boolean = true;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use((conf: AxiosResponse): AxiosResponse => {
    has_server_connection = true;
    return conf;
}, async function(error: AxiosError): Promise<any> {
    // const store = useUserDataConfigStore();

    if (error?.status === 401 || error.status === 403) {
        // validation when the user is invalid or unauthorized
        // await store.logout();
        toastEventBus.emit("add", { severity: "error", summary: "Token Error", detail: "Su sesión ha expirado", life: 5000 });
    } else {
        if (error.response?.data && error.response.headers["content-type"] !== "text/html; charset=utf-8") {
            await handleServerError(error.response?.data);
        } else {
            if (has_server_connection) {
                showToast("error", "Error al hacer la petición al servidor");
            }
            if (error.code === "ERR_NETWORK") {
                has_server_connection = false;
            }
        }
        return Promise.reject(error);
    }
});

async function handleServerError(errorData: unknown): Promise<void> {
    if ( !errorData) {
        showToast("error", "Ocurrió un error inesperado.");
        return;
    }

    if (typeof errorData === "string") {
        showToast("error", errorData);
        return;
    }

    if (Array.isArray(errorData)) {
        errorData.forEach((err) => showToast("error", String(err)));
        return;
    }

    if (typeof errorData === "object") {
        const data = errorData as Record<string, any>;

        // Función recursiva para extraer errores
        const extractMessages = (obj: any) => {
            if (typeof obj === "string") {
                showToast("error", obj);
            } else if (Array.isArray(obj)) {
                obj.forEach((item) => extractMessages(item));
            } else if (typeof obj === "object" && obj !== null) {
                Object.values(obj).forEach((val) => extractMessages(val));
            }
        };

        if (data.errors) {
            extractMessages(data.errors);
        } else if (data.detail && Array.isArray(data.detail)) {
            data.detail.forEach((msg: any) => {
                showToast("error", typeof msg === "string" ? msg : String(msg?.msg || msg));
            });
        } else {
            extractMessages(data);
        }
        return;
    }

    showToast("error", "Error desconocido.");
}

function showToast(severity: "success" | "info" | "warn" | "error", detail: string): void {
    toastEventBus.emit("add", { detail: detail, life: 5000, severity: severity, summary: "Server Error" });
}

interface ApiProps<T> {
    route: string;
    params?: Record<string, any>;
    data?: T;
}

async function Get(props: ApiProps<any>): Promise<{ response: AxiosResponse }> {
    try {
        const response = await axiosInstance.get(`/api/${ props.route }/`, { params: props.params });
        return { response };
    } catch (error) {
        console.error(error);
        throw { response: null };
    }
}

async function Post(props: ApiProps<any>): Promise<{ response: AxiosResponse }> {
    try {
        const response = await axiosInstance.post<AxiosResponse>(`/api/${ props.route }/`, props.data);
        return { response };
    } catch (error) {
        console.log(error);
        throw { response: null };
    }
}

export const Api = { Get, Post };
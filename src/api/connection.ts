import toastEventBus from "primevue/toasteventbus";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { type ErrorResponse } from "@/api/errorResponse";

let baseURL: string = import.meta.env.VITE_API_APP_URL;
let has_server_connection: boolean = true;

const axiosInstance = axios.create({ baseURL });

// axiosInstance.interceptors.request.use((conf: InternalAxiosRequestConfig) => {
//     const store = useUserDataConfigStore();
//     const token = store.userData.token;
//     if (token) {
//         conf.headers.authorization = `Bearer ${ token }`;
//     } else {
//         conf.headers.authorization = "";
//     }
//     return conf;
// }, (error) => Promise.reject(error));

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
    } else if (Array.isArray(errorData)) {
        errorData.forEach((err) => showToast("error", String(err)));
    } else if (typeof errorData === "object") {

        const data = errorData as Record<string, any>;
        if (data.errors && typeof data.errors === "object") {
            Object.values(data.errors).forEach((messages) => {
                if (Array.isArray(messages)) {
                    messages.forEach((msg: ErrorResponse) => showToast("error", String(msg)));
                } else {
                    showToast("error", String(messages));
                }
            });
        } else if (data.detail === "array") {
            data.detail.forEach((msg: ErrorResponse) => {
                showToast("error", String(msg.msg));
            });
        } else {
            showToast("error", data.detail);
        }
    } else {
        showToast("error", "Error desconocido.");
    }
}

function showToast(severity: "success" | "info" | "warn" | "error", detail: string): void {
    toastEventBus.emit("add", {
        detail: detail,
        life: 5000,
        severity: severity,
        summary: "Backend Error"
    });
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
        throw { error };
    }
}

export const Api = { Get, Post };
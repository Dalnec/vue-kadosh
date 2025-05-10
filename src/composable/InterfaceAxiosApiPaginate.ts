import { type AxiosResponseHeaders, type InternalAxiosRequestConfig, type RawAxiosResponseHeaders } from "axios";

export interface InterfaceAxiosApiPaginate<T> {
    response: Response<T>;
}

export interface Response<T> {
    data: Data<T>;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig;
    request?: any;
}

export interface Data<T> {
    total: number;
    size: number;
    page: number;
    results: T[];
}

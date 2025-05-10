import { type AxiosResponseHeaders, type InternalAxiosRequestConfig, type RawAxiosResponseHeaders } from "axios";

export interface InterfaceAxiosApiNoPaginate<T> {
    response: Response<T>;
}


export interface InterfaceAxiosApiResponse<T> {
    response: ResponsePostPut<T>;
}

export interface ResponsePostPut<T> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig;
    request?: any;
}

export interface Response<T> {
    data: T[];
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig;
    request?: any;
}

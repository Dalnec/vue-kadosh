import type { InterfaceAxiosApiResponse } from "@/composable/InterfaceAxiosApiNoPaginate.ts";

export interface InterfaceMembers {
    church: number | null;
    doc_num: string;
    documenttype?: number | null;
    gender: string;
    kind: number | null;
    lastnames: string;
    names: string;
    age: number | null;
    phone: string;
    id?: number;
    status: boolean;
}

export type UsersActiosMembers = InterfaceAxiosApiResponse<InterfaceMembers>
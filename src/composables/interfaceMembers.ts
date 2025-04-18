import type { InterfaceAxiosApiNoPaginate/*, InterfaceAxiosApiResponse*/ } from "@/composables/InterfaceAxiosApiNoPaginate.ts";

export interface InterfaceMembers {
    birthdate: Date | Date[] | (Date | null)[] | null | string;
    church: string;
    dni: string;
    docType: string;
    gender: string;
    isMember: string;
    lastnames: string;
    names: string;
    phone: string;
    voucherImage: object | undefined;
    id?: number;
}

export type InterfaceResponseMembers = InterfaceAxiosApiNoPaginate<InterfaceMembers>
// export type UsersActiosMembers = InterfaceAxiosApiResponse<InterfaceMembers>
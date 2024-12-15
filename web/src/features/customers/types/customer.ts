import { TEntityBase } from "../../../shared/utils/rtkUtils";

export interface Customer extends TEntityBase<string> {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateCustomer {
    id?: string,
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isVerified: boolean;
}

export interface CustomerDetail {
    id: string,
    customerId: string;
    newsletterSubscribed: boolean;
    preferredLanguage: string;
    preferredCurrency: string;
    // orderHistory?: OrderHistory[];
}


export interface Address {
    id: string,
    customerId: string,
    street: string;
    city: string;
    state?: string;
    zipCode: string;
    country: string;
}


export interface OrderHistory {
    id: string;
    customerId: string;
    orderId: string;
    date: Date;
    totalAmount: number;
}




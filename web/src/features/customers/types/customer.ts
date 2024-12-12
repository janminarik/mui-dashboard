export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
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




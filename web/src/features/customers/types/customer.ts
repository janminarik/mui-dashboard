export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detailId: string;
}

export enum CustomerType {
    Individual = "Individual",
    Business = "Business",
}

export enum PreferredPaymentMethod {
    CreditCard = "Credit Card",
    PayPal = "PayPal",
    BankTransfer = "Bank Transfer",
    CashOnDelivery = "Cash on Delivery"
}

export enum PreferredShippingMethod {
    Standard = "Standard",
    Express = "Express",
    Pickup = "Pickup"
}

export interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
};


export interface CustomerDetail {
    id: string;
    customerType: CustomerType,
    companyName?: string;
    taxNumber?: string;
    totalOrders: number;
    totalSpent: number;
    averageOrderValue?: number;
    loyaltyPoints: number;
    preferredPaymentMethod: PreferredPaymentMethod;
    preferredShippingMethod: PreferredShippingMethod
    wishlistItems?: string[];
    recentOrderDate?: string;
    registeredAt: string;
    lastLoginAt?: string;
    address: Address;
    notes?: string;
}

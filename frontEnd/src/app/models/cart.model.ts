export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
}

export interface DeliveryPerson {
    id: number;
    name: string;
    phone: string;
    email: string;
    image: string;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
    isDelivery: boolean;
    tableNumber?: number;
    deliveryPerson?: DeliveryPerson;
}

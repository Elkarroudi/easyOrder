export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
}

export interface DeliveryPerson {
    id: number;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    phone: string;
    email: string;
}

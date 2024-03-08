export interface Product {
    id: string;
    name: string;
    rentalCostPerMonth: number;
}

export interface CartItem {
    product: Product;
    rentDuration: number;
}
// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [
    { product: { id: '1', name: 'Sofa', rentalCostPerMonth: 500 }, rentDuration: 3 },
    { product: { id: '2', name: 'Coffee Table', rentalCostPerMonth: 200 }, rentDuration: 3 },
    // Add more items as needed
  ];

  constructor() { }

  calculateTotalBillingAmount(): number {
    let totalAmount = 0;
    this.cartItems.forEach(item => {
        totalAmount += item.product.rentalCostPerMonth * item.rentDuration;
    });
    return totalAmount;
  }
}

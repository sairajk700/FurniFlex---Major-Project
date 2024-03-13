
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalCartPrice = 0;
  baseUrl: string = 'http://localhost:3000/';
  addressForm: FormGroup;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const userId = this.authService.getUserId(); // Implement this method in your AuthService
    this.cartService.getUserCartItems(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItems = response.cartItems;
          this.calculateTotalCartPrice();
        }
      },
      error: (error) => console.error('Error fetching cart items:', error)
    });
  }

  removeCartItem(cartId: string): void {
    this.cartService.removeCartItem(cartId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item._id !== cartId);
        this.calculateTotalCartPrice();
        alert('Product removed from cart successfully');
      },
      error: (error) => console.error('Error removing cart item:', error)
    });
  }

  calculateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  getImageUrl(relativePath: string): string {
    return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`;
  }

  checkout(): void {
    if (this.addressForm.valid) {
      const address = this.addressForm.get('address')?.value;
      
      this.userService.updateAddress(address).subscribe({
        next: () => {
          alert('Address updated and checkout successful');
         
        },
        error: (error) => console.error('Error during checkout:', error)
      });
    } else {
      alert('Please fill in your address.');
    }
  }
}

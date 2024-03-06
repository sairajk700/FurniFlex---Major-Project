import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  
  constructor() { }

  onSubmit() {
    // Here you would typically handle the form submission,
    // such as validating input data, and then submitting the order details to your backend.
    console.log("Order submitted!");
  }

}

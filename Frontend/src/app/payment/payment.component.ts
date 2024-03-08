import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  selectedOption: string = 'debit-card'; // Default selected option

  togglePaymentOption() {
    // Logic to toggle payment option based on the selected radio button
  }
}

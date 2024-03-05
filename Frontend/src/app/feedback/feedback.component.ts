import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  rating: number = 0;
  comment: string = '';

  constructor() { }

  

  submitFeedback() {
    // Handle submission logic here
    console.log('Rating:', this.rating);
    console.log('Comment:', this.comment);
  }

  
}
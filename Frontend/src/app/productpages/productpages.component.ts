import { Component } from '@angular/core';

@Component({
  selector: 'app-productpages',
  templateUrl: './productpages.component.html',
  styleUrl: './productpages.component.css'
})
export class ProductpagesComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {

      
      this.products = products;
    });
  }

}




}

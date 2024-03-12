import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpagesComponent } from './productpages.component';

describe('ProductpagesComponent', () => {
  let component: ProductpagesComponent;
  let fixture: ComponentFixture<ProductpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductpagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

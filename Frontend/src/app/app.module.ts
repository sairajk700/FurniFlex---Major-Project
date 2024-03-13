import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< Updated upstream
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

=======
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
>>>>>>> Stashed changes
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
<<<<<<< Updated upstream
    FooterComponent
=======
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    WishlistComponent,
    FeedbackComponent,
    NotFoundComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< Updated upstream
    NgbModule
=======
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
>>>>>>> Stashed changes
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

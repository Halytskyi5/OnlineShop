import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./pages/shop/shop.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./pages/home/home.component";
import {AboutBrandComponent} from "./pages/about-brand/about-brand.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {CartComponent} from "./pages/cart/cart.component";
import {OrderComponent} from "./pages/order/order.component";
import {OrderSuccessComponent} from "./pages/order-success/order-success.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'about-brand', component: AboutBrandComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order-success', component: OrderSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

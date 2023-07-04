import {Component, OnInit} from '@angular/core';
import { AppModule} from "../../app.module";
import {ProductDetailService} from "../../services/product-detail.service";
import {Product} from "../../product";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  cart : Product[] = [];
  cartSubscription : Subscription;
  private subscriptionCart : Subscription;

  constructor(private productDetailService : ProductDetailService, private cartService : CartService) {
    this.subscriptionCart = this.cartService.getUpdate().subscribe(products =>{
      this.getCart();
    })
  }
  ngOnInit() {
    this.getCart();
  }
  getCart(){
    this.cartSubscription = this.productDetailService.getProductFromCart().subscribe( (data) =>{
      this.cart = data;
    });
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
    this.subscriptionCart.unsubscribe();
  }

}

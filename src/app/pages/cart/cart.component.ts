import {Component, OnInit} from '@angular/core';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {Product} from "../../product";
import {Subscription} from "rxjs";
import {ProductDetailService} from "../../services/product-detail.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private productDetailService: ProductDetailService, private cartService : CartService) { }
  cart : Product[] = [];
  cartSubscription : Subscription;
  totalPrice : number = 0;
  getTotalPrice(){
    this.productDetailService.getProductFromCart().subscribe( cartItems =>{
      this.cart = cartItems;
      if(this.cart){
        this.cart.map(item =>{
          this.totalPrice += item.price * item.quantity;
        })
      }
    })
  }
  ngOnInit() {
    this.cartSubscription = this.productDetailService.getProductFromCart().subscribe( (data) =>{
      this.cart = data;
    });
    this.getTotalPrice();
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
  }
  removeProductFromCart(product : Product){
    this.productDetailService.removeProductFromCart(product.id).subscribe( () =>{
      let idx = this.cart.findIndex( (data) => data.id === product.id);
      this.cart.splice(idx, 1);
    })
  }
  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }
}

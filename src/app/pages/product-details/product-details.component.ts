import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../product";
import {ActivatedRoute} from "@angular/router";
import {ProductDetailService} from "../../services/product-detail.service";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private cartService : CartService) {
  }
  product : Product;
  cart : Product[];
  cartSubscription : Subscription;
  data : string = "1";
  quantity: number = 1;
  ngOnInit() {
    this.getProduct();
    this.cartSubscription = this.productDetailService.getProductFromCart().subscribe( (data ) => {
      this.cart = data;
    })
  }
  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }
  getProduct(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productDetailService.getProduct(id).subscribe(product =>{
      this.product= product;
    })
  }
  parseData(product : Product){
    this.quantity = parseInt(this.data);
    this.addToCart(product);
  }
  addToCart(product : Product){
    product.quantity = this.quantity;
    let findItem;

    if(this.cart.length > 0 ){
      findItem = this.cart.find( (item) => item.id === product.id)
      if (findItem) this.updateToCart(findItem)
      else this.postToCart(product);
    }else this.postToCart(product);
    alert(`Товар ${product.name} кількістю ${product.quantity} шт успішно добавлено в корзину!`)
  }
  postToCart(product : Product){
    this.productDetailService.postProductToCart(product).subscribe( (data) =>
      this.cart.push(data)
    );
  }
  updateToCart(product : Product){
    product.quantity += this.quantity;
    this.productDetailService.updateProductToCart(product).subscribe( (data) =>{

    })
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
  }

  protected readonly Number = Number;
  protected readonly parseInt = parseInt;
}

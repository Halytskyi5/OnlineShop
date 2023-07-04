import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../product";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  productsURL : string = "http://localhost:3000/products";
  cartURL : string = "http://localhost:3000/cart";
  constructor(public http: HttpClient) { }
  getProduct(id : number) : Observable<Product>{
    const productUrl = `${this.productsURL}/${id}`;
    return this.http.get<Product>(productUrl);
  }
  postProductToCart(product : Product){
    return this.http.post<Product>(this.cartURL, product);
  }
  getProductFromCart(){
    return this.http.get<Product[]>(this.cartURL);
  }
  updateProductToCart(product : Product){
    return this.http.put<Product>(`${this.cartURL}/${product.id}`, product);
  }
  removeProductFromCart(id : number){
    return this.http.delete<any>(`${this.cartURL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Product} from "../product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Subject<Product[]>();
  sendUpdate(productsCart : Product[]){
    this.cart.next(productsCart);
  }
  getUpdate():Observable<Product[]>{
    return this.cart.asObservable();
  }
  constructor() { }
}

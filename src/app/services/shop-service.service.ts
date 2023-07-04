import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Product} from "../product";

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  serviceURL : string;
  constructor(public http : HttpClient) {
    this.serviceURL = "http://localhost:3000/products";
  }
  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.serviceURL);
  }

}

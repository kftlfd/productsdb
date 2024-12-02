import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Product = {
  id: number;
  sku: string;
  name: string;
  price: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get<Product[]>('http://localhost/api/');
  }
}

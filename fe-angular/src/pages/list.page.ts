import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { Product, ProductsService } from '../services/products.service';
import { AsyncData, toAsyncData } from '../utils/async-data';
import { ProductCard } from '../components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'list-page',
  imports: [RouterLink, AsyncPipe, ProductCard],
  template: `
    <nav class="nav">
      <h1>Products list</h1>
      <button class="btn" (click)="refresh()">Refresh</button>
      <div class="grow"></div>
      <button class="btn">Mass delete</button>
      <router-link class="btn" [routerLink]="'/add'">Add</router-link>
    </nav>

    <main class="main">
      @if (products$ | async; as products) { @switch (products.state) { @case
      ('error') {
      <div>Error</div>
      } @case ('loading') {
      <div>Loading...</div>
      } @case ('loaded') {
      <div class="grid">
        @for (p of products.data; track p.id) {
        <product-card [product]="p" />
        }
      </div>
      } } }
    </main>
  `,
  styles: `
    :host { display: contents; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }
  `,
})
export class ListPage {
  products$!: Observable<AsyncData<Product[]>>;

  constructor(private productsService: ProductsService) {}

  refresh() {
    this.products$ = toAsyncData(this.productsService.fetchProducts());
  }

  ngOnInit() {
    this.refresh();
  }
}

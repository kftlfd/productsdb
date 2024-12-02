import { Component, Input } from '@angular/core';
import { Product } from '../../services/products.service';

@Component({
  standalone: true,
  selector: 'product-card',
  template: `
    <div class="card">
      <div>{{ product.id }}</div>
      <div>{{ product.sku }}</div>
      <div>{{ product.name }}</div>
    </div>
  `,
  styles: `
    .card {
      border: 1px solid gray;
      border-radius: 4px;
      background-color: white;
      padding: 1rem;
    }
  `,
})
export class ProductCard {
  @Input() product!: Product;
}

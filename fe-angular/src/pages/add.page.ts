import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'add-page',
  imports: [RouterLink],
  template: `
    <nav class="nav">
      <h1>Add product</h1>
      <div class="grow"></div>
      <button class="btn">Save</button>
      <router-link class="btn" [routerLink]="'/'">Cancel</router-link>
    </nav>

    <main class="main">
      <form>
        <label>SKU</label>
        <input type="text" name="sku" />
      </form>
    </main>
  `,
  styles: `
    :host { display: contents; }
  `,
})
export class AddPage {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'error-page',
  imports: [RouterLink],
  template: `
    <main class="main">
      <h1>Page not found</h1>
      <router-link class="btn" [routerLink]="'/'">Homepage</router-link>
    </main>
  `,
  styles: `
    :host { display: contents; }
  `,
})
export class ErrorPage {}

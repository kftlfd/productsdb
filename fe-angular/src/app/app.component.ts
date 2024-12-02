import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from '../components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, AppFooter],
  template: `
    <router-outlet />
    <app-footer />
  `,
  styles: `
    :host { display: contents }
  `,
})
export class AppComponent {}

import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: ` <footer>footer</footer> `,
  styles: `
    :host { display: contents; }
    footer {
      border-top: 1px solid gray;
      padding-block: 1rem;
    }
  `,
})
export class AppFooter {}

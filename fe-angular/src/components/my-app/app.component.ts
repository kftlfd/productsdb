import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComp } from '../my-comp/my-comp.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [RouterOutlet, MyComp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class MyApp {
  title = 'front';

  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }

  onAdd(msg?: string) {
    console.log('callback: ', msg);
  }
}

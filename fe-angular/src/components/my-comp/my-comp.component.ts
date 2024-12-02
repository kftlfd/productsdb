import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'my-comp',
  standalone: true,
  template: `
    <div>
      <p>msg: {{ msg }}</p>
      <button (click)="onAddItem()">add item</button>
    </div>
  `,
  styles: `
    p {
      color: green;
    }
  `,
})
export class MyComp {
  @Input() msg = '';

  @Output() addItemEvent = new EventEmitter<string>();

  @Input() onAdd?: ((msg?: string) => void) | null;

  onAddItem() {
    this.addItemEvent.emit(new Date().toISOString());
    this.onAdd?.('hey callback');
  }
}

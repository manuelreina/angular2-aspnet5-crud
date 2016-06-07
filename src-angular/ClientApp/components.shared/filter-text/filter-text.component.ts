import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'filter-text',
  template: require('./filter-text.component.html'),
  //styleUrls: [require('./filter-text.component.css')],
  directives: []
})
export class FilterTextComponent {
  @Output() changed: EventEmitter<string>;
  filter: string = '';

  constructor() {
    this.changed = new EventEmitter<string>();
  }

  clear() {
    this.filter = '';
  }

  filterChanged(event: any) {
    event.preventDefault();
    this.changed.emit(this.filter);
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() icon?: string;
  @Input() iconColor: string = 'inherit';
  @Output() buttonClick = new EventEmitter<Event>();
  constructor() { }

  onClick(event: Event): void {
    this.buttonClick.emit(event);
  }

}

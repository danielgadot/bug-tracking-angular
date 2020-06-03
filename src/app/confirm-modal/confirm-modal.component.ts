import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input() message: string;
  @Output() noEventClicked = new EventEmitter();
  @Output() confirmYesClicked = new EventEmitter();

  constructor() { }
  noClickEvent() {
      this.noEventClicked.emit();
  }

  yesClickEvent() {
      this.confirmYesClicked.emit();
  }

}

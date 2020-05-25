import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() message: string;
  @Output() noEventClicked = new EventEmitter();
  @Output() confirmYesClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  noClickEvent() {
      this.noEventClicked.emit();
  }

  yesClickEvent() {
      this.confirmYesClicked.emit();
  }

}

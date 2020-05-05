import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  @Output() notifyParentToAddList: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  handleAddListClick() {
    this.notifyParentToAddList.emit('add-list');
  }
}

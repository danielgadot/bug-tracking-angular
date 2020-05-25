import {Component, HostListener, OnInit, ElementRef, Input} from '@angular/core';
import {ListService} from '../services/list/list.service';

@Component({
  selector: 'list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

  showMenu = false;
  showConfirmModal = false;

  @Input() listName;
  constructor(private eRef: ElementRef, public listService: ListService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click', ['$event'])
  toggleOff(event){
    if (this.showMenu) {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.showMenu = false;
      }
    }
  }

  deleteList() {
    this.showConfirmModal = true;
  }

  confirmNoClicked() {
    this.showConfirmModal = false;
  }

  confirmYesClicked() {
    this.showConfirmModal = false;
    this.listService.deleteList(this.listName);
  }
}

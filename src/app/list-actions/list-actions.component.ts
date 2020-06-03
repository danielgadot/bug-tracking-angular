import {Component, HostListener, OnInit, ElementRef, Input} from '@angular/core';
import {BoardService} from '../services/board/board.service';

@Component({
  selector: 'list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

  showMenu = false;
  showConfirmModal = false;

  @Input() listName;
  constructor(private eRef: ElementRef, public boardService: BoardService) { }

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
    this.showMenu = false;
  }

  confirmNoClicked() {
    this.showConfirmModal = false;
  }

  confirmYesClicked() {
    this.showConfirmModal = false;
    this.boardService.deleteList(this.listName);
  }
}

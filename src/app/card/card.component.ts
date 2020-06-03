import {Component, Input, ViewChild, QueryList, ElementRef} from '@angular/core';
import Card from '../models/card';
import { BoardService } from '../services/board/board.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  showActionsEdit = false;

  @Input() card: Card;
  @Input() listName: string;
  titlePlaceHolder: string;
  @ViewChild('txtArea') textArea: ElementRef;

  constructor(private boardService: BoardService) { }

  editCardTitle() {
    this.showActionsEdit = true;
    this.titlePlaceHolder = this.card.cardTitle;
    console.log('%c this.textArea', 'color: red', this.textArea)
    this.textArea.nativeElement.focus();
  }
  cancelEdit() {
    this.showActionsEdit = false;
    this.card.cardTitle = this.titlePlaceHolder;

  }
  approveEdit() {
    this.showActionsEdit = false;
    this.boardService.updateCardTitle(this.titlePlaceHolder, this.card.cardTitle, this.listName);
  }
  deleteCard() {
    this.boardService.deleteCard(this.card.cardTitle, this.listName);
  }

}

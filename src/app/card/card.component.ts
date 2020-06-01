import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Card from '../models/card';
import { CardService } from '../services/card/card.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  showActionsEdit = false; // move to card component

  @Input() card: Card;
  @Input() listName: string;
  titlePlaceHolder: string;
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  editCardTitle() {
    this.showActionsEdit = true;
    this.titlePlaceHolder = this.card.cardTitle;
  }
  cancelEdit() {
    this.showActionsEdit = false;
    this.card.cardTitle = this.titlePlaceHolder;

  }
  approveEdit() {
    this.showActionsEdit = false;
    this.cardService.updateCardTitle(this.titlePlaceHolder, this.card.cardTitle, this.listName);
  }
  deleteCard() {
    console.log('deleting card');
    this.cardService.deleteCard(this.card.cardTitle, this.listName);
  }

}

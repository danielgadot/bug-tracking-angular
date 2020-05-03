import { Component, OnInit, Input } from '@angular/core';
import Card from './../models/card';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  
  @Input() cards: Card[];
  @Input() listTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

  addCard() {
    let newCardTitle = prompt('card title')
    this.cards.push({
      title: newCardTitle
    })
  }

}

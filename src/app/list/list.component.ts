import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import Card from './../models/card';
import {AngularFirestore} from '@angular/fire/firestore';
import User from '../models/user';
import {tap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import List from '../models/list';
import { BoardService } from '../services/board/board.service';

'./services/list/list.service'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],

})
export class ListComponent implements OnInit {

  user: User;

  @Input() list: Card[];
  @Input() listName: string;
  listNameCache: string = this.listName;

  constructor(public auth: AuthService, private afs: AngularFirestore, private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.listNameCache = this.listName;
  }

  addCard() {
    const newCardTitle = prompt('card title');
    if (newCardTitle && newCardTitle !== ''){
      this.boardService.addCard({ cardTitle: newCardTitle, listName: this.listName});
    }
  }

  listNameChange() {
    if (!this.listNameCache) {
      this.listNameCache = this.listName;
    }
    this.boardService.updateListName(this.listNameCache, this.listName);
  }
}

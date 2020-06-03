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

  constructor(public auth: AuthService, private afs: AngularFirestore, private listService: BoardService) {
  }

  ngOnInit(): void {
  }

  addCard() {
    const newCardTitle = prompt('card title');
    this.listService.addCard({ cardTitle: newCardTitle, listName: this.listName});
  }
}

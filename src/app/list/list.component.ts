import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import Card from './../models/card';
import {AngularFirestore} from '@angular/fire/firestore';
import User from '../models/user';
import {tap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import List from '../models/list';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],

})
export class ListComponent implements OnInit {

  user: User;

  @Input() list: Card[];
  @Input() listName: string;
  @Output() newCardEvent = new EventEmitter<any>();

  constructor(public auth: AuthService, private afs: AngularFirestore) {
    this.auth.user$.pipe(

      tap(user => {
        this.user = user;
        console.log('list comp ', this.list);
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  addCard() {
    const newCardTitle = prompt('card title');
    this.newCardEvent.emit({ cardTitle: newCardTitle, listName: this.listName});
  }
}

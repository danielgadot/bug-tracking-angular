import {Component, OnDestroy, OnInit} from '@angular/core';
import {pipe, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {useStreams} from '../../utils/useStreams';
import {ListService} from '../services/list/list.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../services/auth/auth.service';
import User from '../models/user';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnDestroy {

  lists: any;
  user: User;
  unsub$ = new Subject<void>();
  afs: AngularFirestore;

  constructor(private listServiceService: ListService, afs: AngularFirestore, public auth: AuthService) {
    useStreams([this.streamGetUser()], this.unsub$);
    this.afs = afs;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
  }

  addList() {
    console.log('add list parent');
    const newListName = prompt(' enter new list name');
    if (!this.user.lists) {
      this.user.lists = {};
    }
    this.user.lists[newListName] = [];
    this.updateLists();
  }
  streamGetUser() {
    return pipe(
      () => this.auth.user$,
      tap(user => {
        if (user) {
          console.log('user in app comp ', user);
          this.user = user;
          this.lists = user.lists;
        }
      }),
    )(null);
  }

  addCard({ cardTitle, listName }) {
    this.user.lists[listName].push({ cardTitle });
    this.updateLists();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event :: ' , event);
    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex) {
        return;
      }
      moveItemInArray(this.user.lists[event.container.data as any], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(this.user.lists[event.previousContainer.data as any],
        this.user.lists[event.container.data as any],
        event.previousIndex,
        event.currentIndex);
    }
    this.updateLists();
  }

  updateLists() {
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }
}

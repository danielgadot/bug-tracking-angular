import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import User from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {

  user: User;
  unsub$ = new Subject<void>();

  constructor(public auth: AuthService, private afs: AngularFirestore) {
    super(auth);
  }

  updateCardTitle(oldTitle, newTitle, listName) {
    const index = this.user.lists[listName].findIndex(card => card.cardTitle === oldTitle);
    this.user.lists[listName][index].cardTitle = newTitle;
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }
}

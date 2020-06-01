import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import User from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {BaseService} from '../base.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {

  user: User;
  unsub$ = new Subject<void>();

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super(afAuth, afs);
  }

  updateCardTitle(oldTitle, newTitle, listName) {
    const index = this.user.lists[listName].findIndex(card => card.cardTitle === oldTitle);
    this.user.lists[listName][index].cardTitle = newTitle;
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }
}

import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import { BaseService } from '../base.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService{


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super(afAuth, afs);
  }

  deleteList(listName) {
    delete this.user.lists[listName];
    this.afs.doc(`users/${this.user.uid}`).update({
      lists: this.user.lists,
      displayName: this.user.displayName,
      email: this.user.email,
      uid: this.user.uid
    });
  }

  addCard({ cardTitle, listName }) {
    console.log('%c this.user :: ', 'color: red;font-size:16px', this.user);

    this.user.lists[listName].push({ cardTitle });
    this.updateLists();
  }

  updateCardTitle(oldTitle, newTitle, listName) {
    const index = this.user.lists[listName].findIndex(card => card.cardTitle === oldTitle);
    this.user.lists[listName][index].cardTitle = newTitle;
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }

  deleteCard(card, listName) {
    this.user.lists[listName] = this.user.lists[listName].filter(cardObj => cardObj.cardTitle !== card);
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }

  updateLists() {
    this.afs.doc(`users/${this.user.uid}`).set({
      lists: this.user.lists
    }, { merge: true });
  }

  addList() {
    const newListName = prompt(' enter new list name');
    if (!this.user.lists) {
      this.user.lists = {};
    }
    if (newListName && newListName !== '') {
      this.user.lists[newListName] = [];
      this.updateLists();
    }
  }
}

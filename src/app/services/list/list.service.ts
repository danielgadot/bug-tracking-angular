import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import { BaseService } from '../base.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService{


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super(afAuth, afs);
    console.log('%c user in list service', 'color: red', this);
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
}

import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService{


  constructor(public auth: AuthService,  private afs: AngularFirestore) {
    super(auth);

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

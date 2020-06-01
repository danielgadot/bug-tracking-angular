import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of, Subject} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import User from '../../models/user';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  user$: Observable<User>;
  unsub$ = new Subject<void>();

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    super(afAuth, afs);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({ uid, displayName, email }) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${ uid }`);
    const data = {
      uid,
      email,
      displayName
    };
    return userRef.set(data, { merge: true });
  }

  async emailSignin(email, password) {
    auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        this.updateUserData(res.user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
  }
}

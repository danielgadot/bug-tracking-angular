import { Injectable } from '@angular/core';
import {useStreams} from '../../utils/useStreams';
import {Observable, of, pipe, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AuthService} from './auth/auth.service';
import User from '../models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  unsub$ = new Subject<void>();
  user: User;
  user$: Observable<User>;

  constructor( afAuth: AngularFireAuth,  afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        console.log('user constructor pipe', user);
        if (user) {
          this.user = user;
          return afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    useStreams([this.streamGetUser()], this.unsub$);
  }

  streamGetUser() {
    return pipe(
      () => this.user$,
      tap(user => {
        console.log('streamGetUser ', user);
        this.user = user;
      }),
    )(null);
  }
}

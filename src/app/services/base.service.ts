import { Injectable } from '@angular/core';
import {useStreams} from '../../utils/useStreams';
import {pipe, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth/auth.service';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  unsub$ = new Subject<void>();
  user: User;

  constructor(public auth: AuthService) {
    useStreams([this.streamGetUser()], this.unsub$);

  }

  streamGetUser() {
    return pipe(
      () => this.auth.user$,
      tap(user => {
        console.log('user in Base service ', user);
        this.user = user;
      }),
    )(null);
  }
}

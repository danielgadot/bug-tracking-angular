import {Component, OnDestroy, OnInit} from '@angular/core';
import {pipe, Subject} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {useStreams} from '../../utils/useStreams';
import {AuthService} from '../services/auth/auth.service';
import User from '../models/user';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnDestroy {

  user: User;
  unsub$ = new Subject<void>();

  constructor(public auth: AuthService) {
    useStreams([this.streamGetUser()], this.unsub$);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
  }

  streamGetUser() {
    return pipe(
      () => this.auth.user$,
      delay(3000),
      tap(user => {
        if (user) {
          this.user = user;
        }
      }),
    )(null);
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { logoutAction } from 'src/app/auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event): void {
    this.store.dispatch(logoutAction());
  }

}

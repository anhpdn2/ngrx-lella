import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {getErrorMessage, getLoading} from "./store/shared/shared.selector";
import {AppState} from "./store/app.state";
import {autoLogin} from "./auth/state/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CounnterButton';
  showLoading: Observable<boolean> | undefined;
  errorMessage: Observable<string> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}

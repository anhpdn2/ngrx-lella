import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {getLoading} from "./store/shared/shared.selector";
import {AppState} from "./store/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CounnterButton';
  showLoading: Observable<boolean> | undefined;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import { AppState } from 'src/app/store/app.state';
import {decrement, increment, reset} from "../state/counter.action";
import {CounterState} from "../state/counter.state";

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css']
})
export class CounterButtonComponent implements OnInit {


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onIncrement(): void {
    this.store.dispatch(increment());
  }

  onDecrement(): void {
    this.store.dispatch(decrement());
  }

  onReset(): void {
    this.store.dispatch(reset());
  }

}

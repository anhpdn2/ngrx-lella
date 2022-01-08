import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CounterState} from "../state/counter.state";
import {changeChannelName, customIncrement} from "../state/counter.action";
import {getChannelName} from "../state/counter.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value: number | undefined;
  channelName$: Observable<string> | undefined;

  constructor(private store: Store<{ counter: CounterState }>) {
  }

  ngOnInit(): void {
    /*this.store.select('counter').subscribe(data => {
      this.channelName = data.channelName;
    });*/
    this.channelName$ = this.store.select(getChannelName);
  }

  addCustomValue() {
    this.store.dispatch(customIncrement(
{
        count: this.value ? +this.value : undefined
      }
    ));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}

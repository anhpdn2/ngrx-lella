import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CounterComponent} from "./counter/counter.component";
import {CounterOutputComponent} from "./counter-output/counter-output.component";
import {CounterButtonComponent} from "./counter-button/counter-button.component";
import {CustomCounterInputComponent} from "./custom-counter-input/custom-counter-input.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {COUNTER_STATE_NAME} from "./state/counter.selector";
import {StoreModule} from "@ngrx/store";
import { counterReducer } from "./state/counter.reducer";

const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  }
]

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonComponent,
    CustomCounterInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
    RouterModule.forChild(routes)
  ],

})
export class CounterModule {}

import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {AUTH_STATE_NAME} from "./state/auth.state";
import {StoreModule} from "@ngrx/store";
import {AuthReducer} from "./state/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import { HttpClient, HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', redirectTo: 'login'
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    RouterModule.forChild(routes),
  ],
  providers: [HttpClient]
})
export class AuthModule {}

import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { EffectsModule } from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', redirectTo: 'login'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'signup', component: SignupComponent
      }
    ]
  }
]

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature(),
    RouterModule.forChild(routes),
  ],
  providers: [HttpClient]
})
export class AuthModule {}

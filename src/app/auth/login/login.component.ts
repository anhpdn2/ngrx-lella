import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {loginStart} from "../state/auth.actions";
import {setLoadingSpinner} from "../../store/shared/shared.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  showDescriptionError(textRequired: string, formControl: string): string {
    if (this.loginForm.get(formControl)?.errors?.['required']) {
      return textRequired + " is required";
    }
    if (this.loginForm.get(formControl)?.errors?.['minlength']) {
      return textRequired + " should be minimum 6 character";
    }
    if (this.loginForm.get(formControl)?.errors?.['email']) {
      return textRequired + " is invalid";
    }
    return "";
  }

  loginSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({state: true}));
    this.store.dispatch(loginStart({email, password}));
  }

}

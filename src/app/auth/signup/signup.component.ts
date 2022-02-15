import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import {AppState} from "../../store/app.state";
import {signupStart} from "../state/auth.actions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({});

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSignupSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({state: true}));
    this.store.dispatch(signupStart({email, password}));
  }

  showDescriptionError(textRequired: string, formControl: string): string {
    if (this.signUpForm.get(formControl)?.errors?.['required']) {
      return textRequired + " is required";
    }
    if (this.signUpForm.get(formControl)?.errors?.['minlength']) {
      return textRequired + " should be minimum 6 character";
    }
    if (this.signUpForm.get(formControl)?.errors?.['email']) {
      return textRequired + " is invalid";
    }
    return "";
  }

}

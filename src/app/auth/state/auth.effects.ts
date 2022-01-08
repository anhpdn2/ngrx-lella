import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { AuthService } from "src/app/service/auth.service";
import {loginStart, loginSuccess} from "./auth.actions";
import {exhaustMap, map, tap} from "rxjs";

@Injectable()
export class AuthEffects {

  constructor(private action$: Actions, private authService: AuthService) {
  }

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        console.log('auth', action)
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}

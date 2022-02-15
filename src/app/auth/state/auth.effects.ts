import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { AuthService } from "src/app/service/auth.service";
import {autoLogin, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, mergeMap, of, tap} from "rxjs";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {

  constructor(private action$: Actions, private store: Store<AppState>, private authService: AuthService, private router: Router) {
  }

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({state: false}));
            this.store.dispatch(setErrorMessage({message: ''}));
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((err) => {
            const errorMessage = this.authService.getErrorMessage(err.error.error.message);
            this.store.dispatch(setLoadingSpinner({state: false}));
            return of(setErrorMessage({message: errorMessage}));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(signupSuccess, loginSuccess),
      tap(() => {
        this.store.dispatch(setErrorMessage({message: ''}));
        this.router.navigate(['/'])
      })
    )
  }, {dispatch: false});

  signup$ = createEffect(() => {
    return this.action$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({state: false}));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({user});
          }),
          catchError(err => {
            this.store.dispatch(setLoadingSpinner({state: false}));
            const errorMessage = this.authService.getErrorMessage(err.error.error.message);
            return of(setErrorMessage({message: errorMessage}));
          })
        )
      })
    )
  });

  signupRedirect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(signupSuccess),
      tap(() => {
        this.store.dispatch(setErrorMessage({message: ''}));
        this.router.navigate(['/']);
      })
    )
  }, {dispatch: false});

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserInLocalStorage();
        return of(loginSuccess({user}));
      })
    )
  })
}

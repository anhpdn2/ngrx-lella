import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {exhaustMap, map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {isAuthenticated} from "../auth/state/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    )
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";
import {AuthResponseData} from "../models/AuthResponseData.model";
import {Observable} from "rxjs";
import {User} from "../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      + environment.FIRBASE_API_KEY, {email, password, 'returnSecureToken': true});
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + (data.expiresIn ? +data.expiresIn * 1000 : 0));
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }
}

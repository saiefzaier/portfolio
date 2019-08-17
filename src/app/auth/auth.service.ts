import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';

import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {timepickerReducer} from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpiration
  constructor(private htpp: HttpClient, private  router: Router) {
  }

  singup(email: string, password: string) {
    return this.htpp.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFHSy7aXhpOcMEp0IIjBsULK6flwi_hDI'
      , {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string) {
    return this.htpp.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFHSy7aXhpOcMEp0IIjBsULK6flwi_hDI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.idToken, resData.idToken, +resData.expiresIn);
    }));

  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.clear();
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData.token, new Date());
    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }

  autoLogout(expiration:number) {
    setTimeout(()=>{
      this.logout()
    },expiration)
  }



  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private handleError(err: HttpErrorResponse) {
    let errormessage = 'An unkinw error';
    if (!err.error || !err.error.error) {
      return throwError(errormessage);
    }

    errormessage = err.error.error.message;
    return throwError(errormessage);
  }


  static isAuthenticated():boolean {

      const userData: User = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return false;
      } else  {
        return true;
      }


  }



}

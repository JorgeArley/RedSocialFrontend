import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../intefaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  public idUser: string = '';

  constructor(private http: HttpClient) { }

  get id() {
    return this.idUser
  }

  login( email: string, password: string ):Observable<User> {
    return this.http.post<User>(`${ this.baseUrl}/login`,{ email, password })
      .pipe(
        tap( user => this.idUser = user.user ),
        tap( (user:User) => {
          localStorage.setItem('token', user.token ),
          localStorage.setItem('uid', user.user )
        })
      );
  }

  logout() {
    localStorage.clear();
  }

}

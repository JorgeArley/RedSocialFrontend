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
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User> {
    return this.http.post<User>(`${ this.baseUrl}/login`,{ email, password })
      .pipe(
        tap( user => this.user = user ),
        tap( (user:any) => localStorage.setItem('token', user.token ))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}

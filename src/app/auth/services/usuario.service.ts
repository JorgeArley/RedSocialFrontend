import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../intefaces/user';
import { Observable, catchError, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

const base_url = environments.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  postUser( formData: User) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (user:any) => localStorage.setItem('token', user.token ))
      );
  }

  getUserById( id: string ): Observable<User|undefined> {
    return this.http.get<User>(`${base_url}/usuarios/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  updateUser( user: any, idUser: string ): Observable<User> {
    return this.http.put<User>(`${base_url}/usuarios/${ idUser }`, user );
  }

}

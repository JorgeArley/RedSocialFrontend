import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../intefaces/user';
import { tap } from 'rxjs';
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
}

import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ApiResp, NewPost, Post } from '../interfaces/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getPosts():Observable<ApiResp> {
    return this.http.get<ApiResp>(`${ this.baseUrl }/posts`);
  }

  addPost( post: NewPost ): Observable<Post> {
    return this.http.post<Post>(`${ this.baseUrl }/posts`, post );
  }
}

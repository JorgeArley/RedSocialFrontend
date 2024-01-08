import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs';
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

  getPostById( id: string ): Observable<any> {
    return this.http.get<any>(`${ this.baseUrl }/posts/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  updatePost( post: any, idPost: string ): Observable<Post> {
    return this.http.put<Post>(`${ this.baseUrl }/posts/${ idPost }`, post );
  }

  getSuggestions( query: string ): Observable<ApiResp> {
    return this.http.get<ApiResp>(`${ this.baseUrl }/search/${ query }`);
  }

  deletePost( idPost: String ): Observable<Post> {
    return this.http.delete<Post>(`${ this.baseUrl }/posts/${ idPost }` );
  }

}

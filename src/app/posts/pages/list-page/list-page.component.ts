import { Component } from '@angular/core';
import { PostService } from '../../services/post.service'
import { ApiResp } from '../../interfaces/post';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  public apiResp?: ApiResp;
  public searchInput = new FormControl('');
  public uid: string = '';

  constructor(private postService: PostService,
              public router: Router) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid') || '';
    this.getPost();
  }

  searchPosts() {
    const value: string = this.searchInput.value || '';
    if (!value) { return }

    this.postService.getSuggestions( value )
    .subscribe( (resp: ApiResp) => {
      this.apiResp = resp
    } )
  }

  getPost() {
    this.postService.getPosts()
    .subscribe({
      next: (resp: ApiResp) => {
        this.apiResp = resp
      },
      error: (message) => {
        Swal.fire('Error', message.error.msg, 'error');
        this.router.navigate(['/auth/login']);
      }
    })
  }

  isOwner(id: String):boolean {
    return this.uid !== id ? true : false;
  }

  delEvent(id: String){
    this.postService.deletePost(id).subscribe( () => {
      Swal.fire('Eliminado', `Publicación eliminada`, 'success');
      this.getPost();
    } )
  }

}

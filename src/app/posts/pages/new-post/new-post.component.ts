import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPost, Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  public edit: boolean = false;
  public idUser: string = '';

  public postForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    likes: new FormControl<string>(''),
  });

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private postService: PostService) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.edit = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.postService.getPostById(id)),
      ).subscribe((post:any) => {
        if (!post) {
          return this.router.navigateByUrl('/');
        }
        this.idUser = post.post.userId._id;
        this.postForm.reset(post.post);
        return;
      });
  }
  saveData() {
    if (this.edit) {
      const dataToSend = {
        "title": this.postForm.value.title,
        "content": this.postForm.value.content,
        "likes": this.postForm.value.likes,
        "userId": this.idUser,
      }
      this.postService.updatePost(dataToSend, this.postForm.value._id ?? '')
      .subscribe({
        next: (resp) => this.router.navigate(['/posts/list']),
        error: (message) => {
          Swal.fire('Error', message.error.msg, 'error');
        }
      })
      return;
    }

    const newPost: NewPost = {
      title: this.postForm.value.title || '',
      content: this.postForm.value.content || '',
      likes: 0,
    };

    this.postService.addPost(newPost)
    .subscribe((resp) => {
      Swal.fire('Hecho', `Publicación creada`, 'success');
      this.router.navigateByUrl('posts/list');
    });
  }
}

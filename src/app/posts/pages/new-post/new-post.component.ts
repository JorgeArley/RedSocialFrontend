import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPost, Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  public edit: boolean = false;

  public postForm = new FormGroup({
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
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      return;
    });
  }
  saveData() {
    const newPost: NewPost = {
      title: this.postForm.value.title || '',
      content: this.postForm.value.content || '',
      likes: 0,
    };

    this.postService.addPost(newPost)
    .subscribe((resp:Post) => {
      console.log(resp)
    });
    this.router.navigateByUrl('posts/list');
  }
}

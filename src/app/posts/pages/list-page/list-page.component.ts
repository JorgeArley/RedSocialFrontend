import { Component } from '@angular/core';
import { PostService } from '../../services/post.service'
import { ApiResp } from '../../interfaces/post';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  public apiResp?: ApiResp;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe( (resp: ApiResp) => {
        this.apiResp = resp;
        console.log(this.apiResp);
      });
  }
}

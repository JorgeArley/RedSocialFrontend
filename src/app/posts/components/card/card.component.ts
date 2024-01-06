import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'post-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public post!: Post;
}

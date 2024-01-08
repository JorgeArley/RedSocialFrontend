import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'post-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public post!: Post;
  @Input()
  public edit!: boolean;

  @Output()
  public miEmitter = new EventEmitter();

  deletePost() {
    this.miEmitter.emit('miEvento');
  }

}

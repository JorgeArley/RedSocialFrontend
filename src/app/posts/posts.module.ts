import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    CardComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }

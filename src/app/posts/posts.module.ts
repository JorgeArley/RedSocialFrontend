import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule
  ]
})
export class PostsModule { }

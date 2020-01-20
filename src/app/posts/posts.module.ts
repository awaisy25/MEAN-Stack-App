// holds the modules for the create posts and displaying list of posts
import { NgModule } from '@angular/core';

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchFilter } from './searchFilter';


@NgModule({ // declarations are for custom built componenets
  declarations: [
    PostListComponent,
    PostCreateComponent,
    SearchFilter
  ],
  imports: [
    CommonModule, // Common module adds common code like ngif
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostsModule {}

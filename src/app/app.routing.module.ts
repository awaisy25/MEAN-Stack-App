// module for routing between pages
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
// creating an array of Route paths
// have list messages in main page and create message seperate page
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent},
  // setting parameter post id to extract specfific posts
  { path: 'edit/:postId', component: PostCreateComponent}
];
@NgModule({
  // importing router module into angular modules
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

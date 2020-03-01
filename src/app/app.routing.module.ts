// module for routing between pages
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { SearchComponent } from './header/searchbar.component';
import { AuthGuards } from './auth/auth-guard';
import { SentimenalComponent } from './statistics/sentimental.stats';
// creating an array of Route paths
// have list messages in main page and create message seperate page
const routes: Routes = [
  // Post list component is the home page
  { path: '', component: PostListComponent },
  // can active prevents users from reaching to creating a post by redirecting them to login page
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuards]},
  // setting parameter post id to extract specfific posts
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuards]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}, // loading tha path where authentication routes are
  {path: 'stats', component: SentimenalComponent, canActivate: [AuthGuards]}
];
@NgModule({
  // importing router module into angular modules
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuards]
})
export class AppRoutingModule {

}

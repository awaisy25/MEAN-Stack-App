// module for routing between pages
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuards } from './auth/auth-guard';
// creating an array of Route paths
// have list messages in main page and create message seperate page
const routes: Routes = [
  // Post list component is the home page
  { path: '', component: PostListComponent },
  // can active prevents users from reaching to creating a post by redirecting them to login page
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuards]},
  // setting parameter post id to extract specfific posts
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuards]},
  // path for login and signup components
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
@NgModule({
  // importing router module into angular modules
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuards]
})
export class AppRoutingModule {

}

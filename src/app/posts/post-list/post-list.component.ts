import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { SearchService } from '../../header/SearchService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // content through array, called by calling posts in ng
 // posts = [
  //  {title: 'First Post', content: 'This is first post'},
   // {title: 'Second Post', content: 'This is the second post'},
  //  {title: 'Third Post', content: 'This is the Third post'}
  // ];
  // getting input from the app.component.ts
  posts: Post[] = [];
  isLoading = false;
  // pagination markup properties
  totalPosts = 0;
  postsPerpage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  // this is the filter value to filter the list component
  SearchVal: string;
  private postsSub: Subscription;

  postService: PostsService;

  private authStatusSub: Subscription;
 // use constructor to get instance of the PostService class from post.service.ts
  constructor(public postsService: PostsService, private authService: AuthService, private search: SearchService) {
  }
  // ng on init calls get posts from Post.services to get the list items
  ngOnInit() {
    this.isLoading = true;
    // default is 2 and 1
    this.postsService.getPosts(this.postsPerpage, this.currentPage);
    // retriving user id to see if it is null
    this.userId = this.authService.getUserId();
    // subscribe calls 3 different methods
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
    // set loading wheel to false once the post is sent to the list
    this.isLoading = false;
    this.totalPosts = postData.postCount;
    this.posts = postData.posts;
    });
    // subscribing from search bar component to get the search value component
    this.search.getFilterValue().subscribe(value => this.SearchVal = value);
    // getting authorization value
    this.userIsAuthenticated = this.authService.getIsAuth();
    // subscribing to authorization status to whether to show or not show the edit/delete button
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }
  // creating the delete function
  onDelete(postId: string) {
    this.isLoading = true;
    // calling the delete post from post services file
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerpage, this.currentPage);
    }, () => { // if subscrive produces error then set loading spinner off
      this.isLoading = false;
    });
  }
  // method for changing the number of posts shown at a time
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    // setting the current page based on page data index
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerpage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerpage, this.currentPage);
  }
  // custome cleanup when instance is destroyed
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

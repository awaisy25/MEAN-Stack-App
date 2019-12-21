// a service class, which you inject into agular components
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
export class PostsService {
  // can't acces from outside
  private posts: Post[] = [];
  // Subject is observable data emitter. Observables listen to data and emit it. its a javascript object
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();
  // creating a constructor for http requests
  constructor(private http: HttpClient, private router: Router) {}
  getPosts(postsPerPage: number, currentPage: number) {
    // backticks are dynamic ways of adding values to a string
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // using get request to retireve the data from node back end get it from posts object in app.js
    this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
    // pipe adds in multiple operators
    .pipe(map((postData) => {
      // map filters an array
      return { posts: postData.posts.map(post => {
        return {
          // changing the mongodb id from _id to id
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
        }; // returning the current count of the database
      }), maxPosts: postData.maxPosts};
    }))
    // the pipe will output the tranformed data into observable
    .subscribe((transformedPostData) => { // using obersvable subscribe to emit the data
      this.posts = transformedPostData.posts;
      // will send the data by accessing the javascript object properties
      this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPostData.maxPosts});

    });
  }

  getPostUpdateListener() {
    // properly returning the subject
    return this.postsUpdated.asObservable();
  }
// get post for edit page not from REST Api
  getPost(id: string) {
    // returning by using get request on http and making it a observable
    return this.http.get<{_id: string, title: string, content: string, imagePath: string }>
    ('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File) {
    // Form Data is  data format that can combine text and file values
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title); // third arguement is passing in the title for the image
    // sending a post request to node
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData) => {
      // creating a router navigation in the observable to navigate back to spinner component
      this.router.navigate(['/']);
    });
  }
// new request for updating
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData; // pipe | allows for different type (or)
    // checking the type of the file
    if (typeof(image) === 'object') {
      // if it is then have at as form data to fit the form fields
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      // post data will be rugular post string values
      postData = {
        // tslint:disable-next-line:object-literal-shorthand
        id: id,
        // tslint:disable-next-line:object-literal-shorthand
        title: title,
        // tslint:disable-next-line:object-literal-shorthand
        content: content,
        imagePath: image
      };
    }

    // put request to update
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe(response => {
      // creating a router navigation in the observable to navigate back to spinner component
      this.router.navigate(['/']);
    });
  }
  // delete request
  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}

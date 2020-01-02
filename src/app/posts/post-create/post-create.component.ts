import {Component, OnInit, OnDestroy} from '@angular/core';

import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
// import component before using it
@Component({
  // html tag to be put in html file
  selector: 'app-post-create',
  // set the html filein template url
  templateUrl: './post-create.component.html',
  // css file can have more than one
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  // variable
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  // property for when on submitted it shows the spinner wheel
  isLoading = false;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;
  private mode = 'create';
  private postId: string;
  private autStatusSub: Subscription;
  // using event emitter to share data between components output allows listening from outside
// creating a constructor for posts.service class
  constructor(public postsService: PostsService, public route: ActivatedRoute,
              public authService: AuthService) {
  }
  ngOnInit() {
    // storing value for if user is authorized
    this.autStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    // using javascript object style to get form controls
    this.form = new FormGroup({
      // synchronous validators and choose what to validate
     title: new FormControl(null,
      {validators: [Validators.required, Validators.minLength(3)]
      }), content: new FormControl(null, {validators: [Validators.required]}),
      // calling the self built mimeType function
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    // paramMap checks if route has specified value
    // if has post id then have in edit mode else create mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // call back for getPost in post.services
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title,
            content: postData.content, imagePath: postData.imagePath, creator: postData.creator};
          // using setvalue to override values in our form control
          this.form.setValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
});
  }
  onImagePicked(event: Event) {
    // accesing the selected file. convert element to html
    const file = (event.target as HTMLInputElement).files[0];
    // patch value targets a single control and sets the value
    this.form.patchValue({image: file});
    // after value is set use upadate and validate the image value
    this.form.get('image').updateValueAndValidity();
    // getting the image tag using file reader
    const reader = new FileReader();
    reader.onload = () => {
      // loading the file asynchronously
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  // creating a method that either adds input or update exisitng ones
  onSavePost() {
    // referencing the variable
    if (this.form.invalid) {
      return;
    }
    // when button is clicked spinner is created by having is loading be true
    this.isLoading = true;
    // if the mode has create it is a new one has no id yet
    if (this.mode === 'create') {
    // calls addPosts from Post.services class
    this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    // clears the input box when clicked on
    this.form.reset();
  }
  ngOnDestroy() {
    this.autStatusSub.unsubscribe();
  }
}

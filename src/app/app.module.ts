import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// need to tell typescript where other file is
import {PostCreateComponent} from './posts/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    // Angular knows the post component
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

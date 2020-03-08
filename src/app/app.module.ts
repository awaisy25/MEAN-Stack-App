import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
// need to tell typescript where other files are
import { HeaderComponent } from './header/header.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module'; // ts file that holds all of the angular material modules
import { PostsModule } from './posts/posts.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchService } from './header/SearchService';
import { SentimenalComponent } from './statistics/sentimental.stats';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    SentimenalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  // provide multiple http interceptions in our project
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  // entry components are components that are dynamic & rarely used
  entryComponents: [ErrorComponent]
})
export class AppModule {

}

// class for handling errors for any https requests
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // mat dialog will display a component that shows error messages
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // listen to the next event from http handler. using catch error to catch any errors from https requests
   return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // error message to send either default or actual error message if it is caught
      let errorMessage = 'An unknown error occured!';
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      this.dialog.open(ErrorComponent, {data: {message: errorMessage}}); // opens the error component html & passing in data to it
      // throw error returns a new observable
      return throwError(error);
    })
   );

  }
}


// function for checking validation on image based if file has .jpg
import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

// asynchronous validator. use : to have it return a promise or a observable
export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  if (typeof(control.value) === 'string') {
    // of is an observable that emits data quickly
   return of(null);
  }
  // getting the paramter value and making sure it is of type file
  const file = control.value as File;
  const fileReader = new FileReader();
  // creating own onservable
  const frObs = Observable.create((observer: Observer<{[key: string]: any}> ) => {
    // listen on load event and perform an action
    fileReader.addEventListener('loadend', () => {
      // crreating a new array with 8 byte int
      const arr = new Uint8Array(fileReader.result).subarray(0, 4);
      // looping through the array and converting to hexadecimal string
      let header = '';
      let isValid = false;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < arr.length; i++ ) {
        header += arr[i].toString(16);
      }
      // using switch statement to check file types
      switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
            isValid = true;
            break;
          default:
            isValid = false;
            break;
      }
      // if isValid is true emit null
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      // tell observer we are done
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};

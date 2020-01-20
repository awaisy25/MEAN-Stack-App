import { Component, Injectable, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
// search bar componenet to be placed in the header
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-bar',
  templateUrl: './searchbar.component.html',
})
@Injectable({providedIn: 'root'})
export class SearchComponent {
  private searchValue = new BehaviorSubject<string>('');

  setValue(input: string) {
    this.searchValue.next(input);
    console.log(input);
  }
  getSearch() {
    return this.searchValue.asObservable();
  }
}

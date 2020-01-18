import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// search bar componenet to be placed in the header
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-bar',
  templateUrl: './searchbar.component.html',
})
export class SearchComponent {
  inputValue = '';

  getInput() {
    return this.inputValue;
  }
}

import { Component, Injectable, OnInit } from '@angular/core';
import { SearchService } from './SearchService';
import { BehaviorSubject } from 'rxjs';
// search bar componenet to be placed in the header
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-bar',
  templateUrl: './searchbar.component.html',
})

export class SearchComponent implements OnInit {
  constructor(private search: SearchService) {}

  // method for on click to call set earch from search service. the input is from search input html
  setValue(input: string) {
    this.search.setSearch(input);
    console.log(input);
  }
  // method to clear the current search value
  Clear() {
    this.search.clearSearch();
  }
  ngOnInit() {
  }
}

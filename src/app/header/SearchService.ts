/*
Service class to have search as a subject to share data between search componenent
& the post list componenet as part of the search feature
*/
import { BehaviorSubject } from 'rxjs';
import { Component, Injectable, Output } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SearchService {
  // setting the current subject value to null
  private SearchSubject = new BehaviorSubject('');
  // function to update the current value
  setSearch(input: string) {
   this.SearchSubject.next(input);
  }
  // function to have it as an observable so another class can subscrive from it
  getFilterValue() {
    return this.SearchSubject.asObservable();
  }
  // clearing it by setting it to null
  clearSearch() {
    this.SearchSubject.next('');
  }
}

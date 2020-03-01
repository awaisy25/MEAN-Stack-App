import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// this service class will have the methods to help retreive statistical data from REST API
@Injectable({providedIn: 'root'})

export class StatsService {
  private URL = 'http://localhost:3000/api/python';
  constructor(private http: HttpClient) {}
  getTopFive() {
  return this.http.get(this.URL);
  }
}

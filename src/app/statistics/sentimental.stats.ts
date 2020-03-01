import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from './stats.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
@Component({
  templateUrl: './sentimental.stats.html',
  styleUrls: ['./sentimental.stats.css']
})
export class SentimenalComponent implements OnInit, OnDestroy {
  // subsciption to hold the subscribe so we can unsubscribe at the end
  sub: Subscription;
  // Array to hold
  private TopFive: any;
  constructor(private stats: StatsService) {}

  ngOnInit() {
    // subscribing to the observable to get top five object
    this.sub = this.stats.getTopFive().subscribe(res => {
    this.TopFive = res;
    // removing the id property
    delete this.TopFive._id;
    console.log(this.TopFive);
    });
  }
// unsubscriivng to prevent memory leak
  ngOnDestroy() {
   this.sub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from './stats.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-stats',
  templateUrl: './sentimental.stats.html',
  styleUrls: ['./sentimental.stats.css']
})
export class SentimenalComponent implements OnInit, OnDestroy {
  // subsciption to hold the subscribe so we can unsubscribe at the end
  sub: Subscription;

  // Array to hold chart data
  public TopFive: any = [];
  // chart options
  view: any[] = [780, 470];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Words';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = true;
  colorScheme = {
    domain: ['#3F51B5', '#E91E63', '#536DFE', '#FF4081', '#9E9E9E']
  };

  constructor(private stats: StatsService) {}

  ngOnInit() {
    this.sub = this.stats.getTopFive().subscribe(res => {
      // mapping each object item to create new array for chart
      this.TopFive = Object.keys(res).map(item => ({
        name: item, value: res[item]
      }));
      // removing the id element since it is not needed
      this.TopFive.shift();
      console.log(this.TopFive);
      });

  }
// unsubscribing to prevent memory leak
  ngOnDestroy() {
   this.sub.unsubscribe();
  }
}

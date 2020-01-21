import {Pipe, PipeTransform } from '@angular/core';
/*
using the pipe module as part of the search filter
PipeTransform to create the custom pipe with transform
*/
@Pipe({
  // naming the pipe filter
  name: 'filter',
  pure: false
})

export class SearchFilter implements PipeTransform {
// transform method to input a list & callback that filter the list if the
// post title equals the filter value
 transform(posts: any[], filter: any): any {
      if (!posts || !filter) {
        return posts;
      }
      // having both values set to lower case just, so its case sensitive
      return posts.filter(post => post.title.toLowerCase() === filter.toLowerCase());
 }
}

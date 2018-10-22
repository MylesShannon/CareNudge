import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  apiRoot = 'http://localhost:3000/doctors';
  reviews = [];

  search = (query, success, error?) => {
    var exists = -1;
    for(var i = 0; i < this.reviews.length; i++) {
      if(this.reviews[i].description && this.reviews[i].description.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        exists = i;
        success([this.reviews[i]]);
      }
    }
    if(exists == -1) {
      this.http.get(this.apiRoot+'/reviews/search/'+query).subscribe((res: any) => {
        this.reviews = res;
        success(res);
      }, error);
    }
  }

  add = (review, success, error?) => {
    this.http.post(this.apiRoot+'/'+review.doctor+'/reviews', review).subscribe((res) => {
      this.reviews.push(review);
      success(res);
    }, error);
  }

  update = (review, success, error?) => {
    this.http.patch(this.apiRoot, review).subscribe(success, error);
  }

  remove = (review, success, error?) => {
    this.http.delete(this.apiRoot+'/'+review.doctor+'/reviews/'+review.id).subscribe(
      (res) => {
        for(let i = 0; i < this.reviews.length; i++) {
          if(this.reviews[i].id === review.id) {
            this.reviews.splice(i, 1);
            // success(res);
            break;
          }
        }
        success(res);
      }, 
      error
    );
  }
}
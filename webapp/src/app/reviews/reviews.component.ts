import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews = [];
  reviewsSearch = '';

  constructor(private route: ActivatedRoute, private reviewStore: ReviewService) { }

  ngOnInit() {
    this.route.url.subscribe((url: any) => {
      var searchQuery = url[1].path.split('+').join(' ');
      this.reviewStore.search(
        searchQuery,
        (res) => {
          this.reviewsSearch = searchQuery;
          this.reviews = res;
        }
      )
    });
  }

}

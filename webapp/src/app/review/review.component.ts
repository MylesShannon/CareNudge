import { Component, Input } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review;

  remove = (review) => {
    this.reviewStore.remove(
      review,
      (res) => {
      }
    )
  }

  constructor(private reviewStore: ReviewService) { }

}
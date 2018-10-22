import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @Input() doctorId;

  constructor(private route: ActivatedRoute, private router: Router, private doctorStore: DoctorService, private reviewStore: ReviewService) { }

  doctor;
  isNewDoctor = false;
  isDirectRoute = false;
  removeDoctor = (doctorId) => {
    this.doctorStore.remove(
      doctorId,
      (res) => {
        if(!this.doctorId) {
          this.router.navigate(['/doctors']);
        }
      }
    );
  }

  removeReview = (review) => {
    this.reviewStore.remove(
      review,
      (res) => {
        for(var i = 0; i < this.doctor.reviews.length; i++) {
          if(this.doctor.reviews[i].id == review.id) {
            this.doctor.reviews.splice(i, 1);
          }
        }
      }
    );
  }

  ngOnInit() {
    this.isDirectRoute = this.doctorId === undefined ? true : false;
    if(!this.isDirectRoute) {
      this.doctorStore.get(
        this.doctorId,
        (doc) => {
          this.doctor = doc;
        },
        () => {
          // no doctor found
        }
      );
    } else if(this.isDirectRoute) {
      this.route.params.subscribe((params) => {
        if(params.id) {
          this.doctorStore.getDoctorWithReviews(
            params.id,
            (doc) => {
              this.doctor = doc;
            },
            () => {
              // no doctor found
            }
          );
        } else {
          this.isNewDoctor = true;
        }
      });
    }
  }
}

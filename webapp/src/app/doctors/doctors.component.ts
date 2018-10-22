import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors = [];
  doctorsSearch = '';

  constructor(private route: ActivatedRoute, private doctorStore: DoctorService) { }

  ngOnInit() {
    this.route.url.subscribe((url: any) => {
      if(!url[1]) {
        this.doctorStore.getAll(
          (res) => {
            this.doctors = res;
          }
        );
      } else {
        if(url[1].path === 'reviews') {
          this.doctorStore.getDoctorsWithReviews(
            (res) => {
              this.doctors = res;
            }
          )
        } else if(!isNaN(url[1].path) && url[2].path === 'reviews') {
          this.doctorStore.getDoctorWithReview(
            url[1],
            url[3],
            (res) => {
              this.doctors = res;
            }
          )
        } else {
          var searchQuery = url[1].path.split('+').join(' ');
          this.doctorStore.search(
            searchQuery,
            (res) => {
              this.doctorsSearch = searchQuery;
              this.doctors = res;
            }
          )
        }
      }
    });
  }

}

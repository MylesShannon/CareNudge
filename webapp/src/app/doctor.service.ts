import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  apiRoot = 'http://localhost:3000/doctors';
  doctors = [];

  get = (doctorId, success, error?) => {
    let doctor = this.doctors.filter((doc: any) => doc.id == doctorId);
    if(doctor.length === 1) {
      success(doctor[0]);
    } else {
      this.http.get(this.apiRoot+'/'+doctorId).subscribe((res) => {
        this.doctors.push(res);
        success(res);
      }, error);
    }
  };

  getAll = (success, error?) => {
    this.http.get(this.apiRoot).subscribe(
      (res: any) => {
        this.doctors = res;
        success(this.doctors);
      }, 
      error
    );
  }

  getDoctorWithReviews = (doctorId, success, error?) => {
    this.http.get(this.apiRoot+'/'+doctorId+'/reviews').subscribe(success, error);
  }

  getDoctorWithReview = (doctorId, reviewId, success, error?) => {
    this.http.get(this.apiRoot+'/'+doctorId+'/reviews/'+reviewId).subscribe(
      (res: any) => {
        this.doctors = [res];
        success([res]);
      }, error);
  }

  getDoctorsWithReviews = (success, error?) => {
    this.http.get(this.apiRoot+'/reviews').subscribe((res: any) => {
      this.doctors = res;
      success(res);
    }, error);
  }

  search = (query, success, error?) => {
    var searchDoctors = function(fields, doctors) {
      for(var i = 0; i < doctors.length; i++) {
        for(var j = 0; j < fields.length; j++) {
          if(doctors[i][fields[j]] && doctors[i][fields[j]] && doctors[i][fields[j]].toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return i;
          }
        }
      }
      return -1;
    }
    var exists = searchDoctors(['name', 'specialty', 'description'], this.doctors);
    if(exists == -1) {
      this.http.get(this.apiRoot+'/search/'+query).subscribe((res: any) => {
        this.doctors = res;
        success(res);
      }, error);
    } else {
      success([this.doctors[exists]]);
    }
  }

  add = (doctor, success, error?) => {
    this.doctors.push(doctor);
    this.http.post(this.apiRoot, doctor).subscribe(success, error);
  }

  update = (doctor, success, error?) => {
    this.http.patch(this.apiRoot, doctor).subscribe(success, error);
  }

  remove = (doctorId, success, error?) => {
    this.http.delete(this.apiRoot+'/'+doctorId).subscribe(
      (res) => {
        for(let i = 0; i < this.doctors.length; i++) {
          if(this.doctors[i].id === doctorId) {
            this.doctors.splice(i, 1);
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
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManagmentService {

  constructor(private http: HttpClient, private router: Router) { }

  one = (endpoint, param, given, callback) => {
    // callback(data, found, isNew)
    // data: response from API
    // found: 200 on data from API
    // isNew: User adding new row
    if(!given) {
      if(param && param.match(/^\d+$/g)) {
        this.http.get('http://localhost:3000/'+endpoint+'/'+param)
        .subscribe(
          (res) => {
            callback(res, true, false);
          },
          () => {
            callback({}, false, false);
          }
        );
      } else if(param !== undefined) {
        // invalid param, go home
        this.router.navigate(['/home']);
      } else {
        // no param, new review
        callback({}, false, true);
      }
    } else {
      callback(given, true, false);
    }
  }

  many = (endpoint, param, callback) => {
    // callback(data, found, isAll)
    // data: response from API
    // found: 200 on data from API
    // showing all rows or else a subset of rows
    let found = false; 
    let isAll = false; 
    if(param) {
      this.http.get('http://localhost:3000/'+endpoint+'/'+param.split('+').join(' '))
        .subscribe((res: Array<number>) => {
          if(res.length >= 1) {
            found = true;
          } else {
            found = false;
          }
          callback(res, found, isAll)
        });
    } else if(param === undefined) {
      this.http.get('http://localhost:3000/'+endpoint)
        .subscribe((res: Array<number>) => {
          if(res.length >= 1) {
            found = true;
            isAll = true;
          } else {
            found = false;
            isAll = false;
          }
          callback(res, found, isAll)
        });
    }
  }
}

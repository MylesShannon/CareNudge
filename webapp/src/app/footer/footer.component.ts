import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  doSearch = function(query) {
    if(query) {
      query = query.split(' ').join('+');
      this.router.navigate(['/reviews/'+query]);
    }
  }

  ngOnInit() {
  }

}

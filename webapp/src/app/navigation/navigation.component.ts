import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navigation = [
    {
      title: 'Doctors',
      route: 'doctors'
    },
    {
      title: 'Doctors & Reviews',
      route: 'doctors/reviews'
    },
    {
      dropdown: true, 
      title: 'More', 
      items:
        [
          {
            title: 'About',
            route: 'about'
          },
          {
            title: 'Contact',
            route: 'contact'
          },
          {
            title: 'Add a Doctor',
            route: 'doctor'
          },
          {
            title: 'Write a Review',
            route: 'review'
          }
        ]
    },
  ];
}

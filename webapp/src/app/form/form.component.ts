import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() form;
  @Input() store;

  constructor(private router: Router) { }

  ngOnInit () {
    if(this.form.successMessage.length > this.form.errorMessage.length) {
      this.statusMessage = this.form.successMessage;
    } else {
      this.statusMessage = this.form.errorMessage;
    }
  }

  errorState = false;
  successState = false;
  statusMessage = "";

  add = (data) => {
    this.store.add(data,
      (s) => {
        this.showMessage('success', s);
      },
      (e) => {
        this.showMessage('error', e);
      }
    );
  }

  showMessage = (state, res) => {
    this[state+'State'] = true;
    this.statusMessage = this.form[state+'Message'];
    setTimeout(
      () => {
        this[state+'State'] = false; 
      },
      2500
    );
  }

}

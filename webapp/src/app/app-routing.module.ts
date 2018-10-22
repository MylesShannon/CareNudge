import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components for routes
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // show home page
  { path: 'doctor/:id', component: DoctorComponent }, // show one doctor by id, GET /doctors/:id
  { path: 'doctor', component: DoctorComponent }, // show new doctor dialog, POST /doctors?name="Dr. Name"&specialty="Dental"
  { path: 'doctors/reviews', component: DoctorsComponent }, // show all doctors with all of their reviews
  { path: 'doctors/:query', component: DoctorsComponent }, // show all doctors by search query, GET /doctors/search/:query
  { path: 'doctors', component: DoctorsComponent }, // show all doctors, GET /doctors
  { path: 'review', component: ReviewComponent }, // show new review dialog, POST /reviews?description="A description"&doctor="1"
  { path: 'reviews/:query', component: ReviewsComponent }, // show all reviews by search query, GET /reviews/search/:query
  { path: 'about', component: AboutComponent }, // show about page
  { path: 'contact', component: ContactComponent }, // show contact page
  { path: '**', redirectTo: '/' } // catch all redirect home
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

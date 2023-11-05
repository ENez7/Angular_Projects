import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./shared/pages/home-page/home-page.component";
import {AboutPageComponent} from "./shared/pages/about-page/about-page.component";
import {ContactPageComponent} from "./shared/pages/contact-page/contact-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: '**', // Any unknown path
    redirectTo: ''
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot( routes ), // This is the main router of the app
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}

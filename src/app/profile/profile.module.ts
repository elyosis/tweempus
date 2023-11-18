import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyTwimpsComponent } from './my-twimps/my-twimps.component';
import { FavoriteTwimpsComponent } from './favorite-twimps/favorite-twimps.component';



@NgModule({
  declarations: [
    ProfileComponent,
    MyTwimpsComponent,
    FavoriteTwimpsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    RouterModule
  ]
})
export class ProfileModule { }

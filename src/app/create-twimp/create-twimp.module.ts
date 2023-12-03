import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTwimpComponent } from './create-twimp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateTwimpRoutingModule } from './create-twimp-routing.module';



@NgModule({
  declarations: [
    CreateTwimpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CreateTwimpRoutingModule
  ]
})
export class CreateTwimpModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MastersComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MastersModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomasComponent } from './diplomas.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DiplomasComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DiplomasComponent
  ]
})
export class DiplomasModule { }
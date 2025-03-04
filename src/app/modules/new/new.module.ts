import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CountDownComponent } from './components/count-down/count-down.component';

const routes: Routes = [
  {
    path: '',
    component: NewComponent,
  },
];

@NgModule({
  declarations: [
    NewComponent,
    CountDownComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NewModule { }

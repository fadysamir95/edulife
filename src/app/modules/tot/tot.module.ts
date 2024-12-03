import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotComponent } from './tot.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../auth/signup/signup.component';

const routes: Routes = [
  {
    path: ':slug',
    component: TotComponent,
  },
];

@NgModule({
  declarations: [
    TotComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SignupComponent
  ],
})
export class TotModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomasComponent } from './diplomas.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TotComponent } from '../tot/tot.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from '../auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: DiplomasComponent, // Main diplomas page
    title: 'Diplomas',
  },
  {
    path: ':slug',
    component: TotComponent, // Course details page
  },
];

@NgModule({
  declarations: [
    DiplomasComponent,
    TotComponent, // Declare TotComponent here
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    CarouselModule,
    SignupComponent,
  ],
})
export class DiplomasModule {}

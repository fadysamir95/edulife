import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeHighlightsComponent } from './components/home-highlights/home-highlights.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeApplyComponent } from './components/home-apply/home-apply.component';
import { HomeBestSellerComponent } from './components/home-best-seller/home-best-seller.component';
import { HomeClassesComponent } from './components/home-classes/home-classes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeMemberComponent } from './components/home-member/home-member.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHighlightsComponent,
    HomeCategoriesComponent,
    HomeApplyComponent,
    HomeBestSellerComponent,
    HomeClassesComponent,
    HomeMemberComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule
  ],
})
export class HomeModule { }
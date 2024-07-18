import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotComponent } from './tot.component';
import { SharedModule } from '../shared/shared.module';
import { TotInnerBannerComponent } from './components/tot-inner-banner/tot-inner-banner.component';
import { TotAboutComponent } from './components/tot-about/tot-about.component';
import { TotAboutPublisherComponent } from './components/tot-about-publisher/tot-about-publisher.component';

@NgModule({
  declarations: [
    TotComponent,
    TotInnerBannerComponent,
    TotAboutComponent,
    TotAboutPublisherComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TotModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/header/header.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { PageInnerBannerComponent } from '../../core/page-inner-banner/page-inner-banner.component';
import { JoinNowComponent } from '../../shared/components/join-now/join-now.component';
import { ScrollDirective } from '../../shared/directives/scroll.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageInnerBannerComponent,
    JoinNowComponent,
    ScrollDirective
  ],
  imports: [
    CommonModule,
    CarouselModule,
    LoginComponent,
    SignupComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageInnerBannerComponent,
    JoinNowComponent,
    ScrollDirective
  ]
})
export class SharedModule { }
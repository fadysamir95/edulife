import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/header/header.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { PageInnerBannerComponent } from '../../core/page-inner-banner/page-inner-banner.component';
import { JoinNowComponent } from '../../shared/components/join-now/join-now.component';
import { ScrollDirective } from '../../shared/directives/scroll.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageInnerBannerComponent,
    JoinNowComponent,
    ScrollDirective
  ],
  imports: [
    CommonModule
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
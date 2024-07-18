import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-inner-banner',
  templateUrl: './page-inner-banner.component.html'
})
export class PageInnerBannerComponent {
  @Input()
  sharedMessage!: string;
}
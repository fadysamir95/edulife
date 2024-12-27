import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SettingsService } from '../../shared/services/riyada-setting.service';
import { GTMService } from '../../shared/services/gtm.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  settingsService = inject(SettingsService);
  gtmService = inject(GTMService)


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 50,
    navText: ['', ''],
    rtl: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      },
      1110: {
        items: 8
      }
    },
    nav: false
  }
  settingsInfo: any;

  ngOnInit(): void {
    this.settingsService.settings$.subscribe((data) => {
      this.settingsInfo = data; // Access the shared settings data
    });
  }

  onPartnerLogoClick(partnerName: string): void {
    this.gtmService.sendGTMEvent('partner_logo_click', { partnerName });
  }

  // Track important link clicks
  onImportantLinkClick(linkName: string): void {
    this.gtmService.sendGTMEvent('important_link_click', { linkName });
  }

  // Track contact link clicks (phone, email, etc.)
  onContactLinkClick(contactType: string, value: string): void {
    this.gtmService.sendGTMEvent('contact_link_click', { contactType, value });
  }

  // Track social media clicks
  onSocialMediaClick(platform: string): void {
    this.gtmService.sendGTMEvent('social_media_click', { platform });
  }
}

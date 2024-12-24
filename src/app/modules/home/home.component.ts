import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SettingsService } from '../../shared/services/riyada-setting.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { GTMService } from '../../shared/services/gtm.service'; // Import GTMService
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  baseUrl = environment.baseUrl;
  notificationService = inject(NotificationService);

  aboutSloganImage: string | null = null;
  sloganImage: string | null = null;
  settingsInfo: any;
  bestSellers: any[] = [];
  instagramPosts: any[] = []; // New: Instagram posts

  settingsService = inject(SettingsService);
  storageService = inject(StorageService);
  router = inject(Router);
  gtmService = inject(GTMService); // Inject GTMService

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    margin: 20,
    navText: ['', ''],
    rtl: true,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 4 },
      940: { items: 4 },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getSettingsData();
    this.getBestSellers();
    // this.getInstagramFeeds();
    this.gtmService.sendGTMEvent('home_view', {}); // Send GTM event for home page view
  }

  getSettingsData(): void {
    this.settingsService.getSettings().subscribe((response: any) => {
      this.settingsService.setDataSettings(response);
      this.settingsInfo = response;
      const adjustedBaseUrl = this.baseUrl.replace('/api', '');
      this.aboutSloganImage = adjustedBaseUrl + this.settingsInfo.about_image;
      this.sloganImage = adjustedBaseUrl + this.settingsInfo.slogan_image;

      // Send GTM event for settings data load
      this.gtmService.sendGTMEvent('settings_load', {
        aboutSloganImage: this.aboutSloganImage,
        sloganImage: this.sloganImage,
      });
    });
  }

  getBestSellers(): void {
    this.settingsService.getBestSellers('ar').subscribe({
      next: (response) => {
        this.bestSellers = response.data;
        this.gtmService.sendGTMEvent('best_sellers_load', {
          count: this.bestSellers.length,
        });
      },
      error: (error) => {
        console.error('Error fetching best sellers:', error);
      },
    });
  }

  onBestSellerClick(seller: any): void {
    this.gtmService.sendGTMEvent('best_seller_click', {
      name: seller.name,
      slug: seller.slug,
    });
    this.router.navigate(['/tot', seller.slug]);
  }

  // // New: Fetch Instagram feeds
  // getInstagramFeeds(): void {
  //   const accessToken = this.storageService.getItem('access_token');
  //   this.settingsService.getInstagramFeeds(accessToken).subscribe({
  //     next: (posts) => {
  //       this.instagramPosts = posts;
  //       console.log('Instagram Posts:', this.instagramPosts);
  //       this.gtmService.sendGTMEvent('instagram_feeds_load', { count: posts.length });
  //     },
  //     error: (err) => console.error('Error fetching Instagram posts:', err),
  //   });
  // }

  // Handle newsletter form submission
  onNewsletterSubmit(event: Event, email: string): void {
    event.preventDefault(); // Prevent default form submission behavior

    if (!email.trim()) {
      this.notificationService.showError('يرجى إدخال البريد الإلكتروني', 'خطأ');
      return;
    }

    this.gtmService.sendGTMEvent('Home_Subscription', { email });
    this.notificationService.showSuccess('تم الإرسال بنجاح', 'نجاح');
  }
}

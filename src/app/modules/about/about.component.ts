import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { GTMService } from '../../shared/services/gtm.service';
import { SettingsService } from '../../shared/services/riyada-setting.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  baseUrl = environment.baseUrl;

  settingsService = inject(SettingsService);
  gtmService = inject(GTMService);

  settingsInfo: any;
  vision_ar: string | null = null;
  target_ar: string | null = null;
  staticties_ar: string | null = null;
  mision_ar: string | null = null;
  aboutSloganImage!: string;
  aboutImage!: string;
  notificationService = inject(NotificationService);


  ngOnInit(): void {
    this.getSettingsData();
  }

  getSettingsData() {
    this.settingsService.getSettings().subscribe((response: any) => {
      this.settingsService.setDataSettings(response); // Store settings in the service
      this.settingsInfo = response;
      const adjustedBaseUrl = this.baseUrl.replace('/api', '');
      this.aboutSloganImage = adjustedBaseUrl + this.settingsInfo.about_slogan_image
      this.aboutImage = adjustedBaseUrl + this.settingsInfo.about_image
    });
  }

  // Handle newsletter form submission
  onNewsletterSubmit(event: Event, email: string): void {
    event.preventDefault(); // Prevent default form submission behavior

    if (!email.trim()) {
      this.notificationService.showError('يرجى إدخال البريد الإلكتروني', 'خطأ');
      return;
    }

    this.gtmService.sendGTMEvent('newsletter_subscription', { email });
    this.notificationService.showSuccess('تم الإرسال بنجاح', 'نجاح');
  }


  // Track image views
  onImageView(imageName: string): void {
    this.gtmService.sendGTMEvent('image_view', { imageName });
  }

  onButtonClick(buttonName: string): void {
    this.gtmService.sendGTMEvent('button_click', { buttonName });
  }
}

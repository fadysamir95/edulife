import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../../shared/services/courses.service';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { StorageService } from '../../shared/services/storage.service';
import { SettingsService } from '../../shared/services/riyada-setting.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-tot',
  templateUrl: './tot.component.html',
})
export class TotComponent {
  diplomaDetails: any = null;
  slug: string = '';
  storageService = inject(StorageService);
  sanitizer = inject(DomSanitizer);
  settingsService = inject(SettingsService);
  sanitizedShortDescription: SafeHtml | null = null;
  sanitizedLongDescription: SafeHtml | null = null;

  isSignupPopupVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  isSubscriptionPopupVisible: boolean = false;

  subscriptionForm = {
    address: '',
    image: null as File | null, // Single file
  };

  coursesService = inject(CoursesService);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private notificationService: NotificationService,
    private title: Title,
    private meta: Meta
  ) {
    this.checkUserLoginStatus();
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.getDiplomaDetails(this.slug);
  }

  getDiplomaDetails(slug: string): void {
    this.coursesService.fetchDiplomaDetails(slug).subscribe({
      next: (response) => {
        this.diplomaDetails = response?.data;

        console.log(this.diplomaDetails);

        // Update the title tag
        this.title.setTitle(this.diplomaDetails?.name);

        // Inject meta tags from the 'codes' field
        if (this.diplomaDetails?.codes?.length)
          this.injectMetaTags(this.diplomaDetails?.codes);

        this.sanitizeDescription();
      },
      error: (error) => {
        console.error('Error fetching diploma details:', error);
      },
    });
  }

  injectMetaTags(codes: string): void {
    const metaTags = codes.match(/<meta [^>]+>/g);

    if (metaTags) {
      metaTags.forEach((tag) => {
        const nameMatch = tag.match(/name="([^"]+)"/);
        const contentMatch = tag.match(/content="([^"]+)"/);

        if (nameMatch && contentMatch) {
          const name = nameMatch[1];
          const content = contentMatch[1];

          // Dynamically add meta tags
          this.meta.addTag({ name, content });
        }
      });
    }
  }

  sanitizeDescription(): void {
    this.sanitizedShortDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.diplomaDetails?.short_description
    );
    this.sanitizedLongDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.diplomaDetails?.long_description
    );
  }

  checkUserLoginStatus(): void {
    // Check if the user is logged in by verifying the access token
    const accessToken = this.storageService.getItem('access_token');
    this.isUserLoggedIn = !!accessToken;
  }

  showSignupPopup(): void {
    this.isSignupPopupVisible = true;
  }

  closePopups(): void {
    this.isSignupPopupVisible = false;
  }

  handleUserRegistered(userName: string): void {
    this.isUserLoggedIn = true;
    this.closePopups();
  }

  // Show Subscription Popup
  showSubscriptionPopup(): void {
    this.isSubscriptionPopupVisible = true;
  }

  // Close Subscription Popup
  closeSubscriptionPopup(): void {
    this.isSubscriptionPopupVisible = false;
  }

  handleFileSelection(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.subscriptionForm.image = target.files[0]; // Single file assignment
    }
  }

  submitSubscriptionForm(): void {
    if (!this.subscriptionForm?.image) {
      console.error('Image is required.');
      return;
    }

    if (!this.diplomaDetails?.id) {
      console.error('Course ID is missing.');
      return;
    }

    const courseId = this.diplomaDetails?.id; // Get courseId from diplomaDetails

    this.sendGTMEvent(`diploma_${this.diplomaDetails.slug}`, {
      address: this.subscriptionForm?.address,
      image: this.subscriptionForm?.image,
      price: this.diplomaDetails.price,
      name: this.diplomaDetails.name,
      slug: this.diplomaDetails.slug,
    });

    this.settingsService
      .subscribeToCourse(courseId, {
        address: this.subscriptionForm?.address,
        image: this.subscriptionForm?.image,
      })
      .subscribe({
        next: (response) => {
          this.notificationService.showSuccess(
            'تم تسجيلك في الدبلوم بنجاح',
            'سيتم التواصل معك في خلال 24 ساعة من الإدارة.'
          );
          this.closeSubscriptionPopup();
        },
        error: (error) => {
          console.error('Subscription failed:', error);
        },
      });
  }

  sendGTMEvent(
    event: string = `diploma_${this.diplomaDetails.slug}`,
    payload: any
  ) {
    window.dataLayer.push({ event, payload });
  }
}

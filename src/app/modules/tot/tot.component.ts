import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../../shared/services/courses.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-tot',
  templateUrl: './tot.component.html',
})
export class TotComponent implements OnInit {
  diplomaDetails: any = null;
  slug: string = '';
  storageService = inject(StorageService)
  sanitizer = inject(DomSanitizer);
  sanitizedShortDescription: SafeHtml | null = null;
  sanitizedLongDescription: SafeHtml | null = null;

  isSignupPopupVisible: boolean = false;
  isUserLoggedIn: boolean = false;


  coursesService = inject(CoursesService)

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {

    this.checkUserLoginStatus();
    // Get the slug from the route
    this.slug = this.route.snapshot.paramMap.get('slug') || '';

    // Fetch diploma details using the slug
    this.getDiplomaDetails(this.slug);
  }


  getDiplomaDetails(slug: string): void {
    this.coursesService.fetchDiplomaDetails(slug).subscribe({
      next: (response) => {

        console.log('Diploma details:', response);
        this.diplomaDetails = response.data;

        this.sanitizeDescription()
      },
      error: (error) => {
        console.error('Error fetching diploma details:', error);
      },
    });
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
    console.log(`User registered: ${userName}`);
    this.isUserLoggedIn = true;
    this.closePopups();
  }

}

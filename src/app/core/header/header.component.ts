import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';
import { GTMService } from '../../shared/services/gtm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoginPopupVisible = false;
  isSignupPopupVisible = false;
  userName: string | null = null;

  constructor(
    private storageService: StorageService,
    private gtmService: GTMService
  ) { }

  ngOnInit() {
    this.storageService.userName$.subscribe((name) => {
      this.userName = name;
    });
  }

  // Show login popup and send GTM event
  showLoginPopup() {
    this.isLoginPopupVisible = true;
    this.isSignupPopupVisible = false;
    this.gtmService.sendGTMEvent('header', { action: 'show login popup' });
  }

  // Show signup popup and send GTM event
  showSignupPopup() {
    this.isSignupPopupVisible = true;
    this.isLoginPopupVisible = false;
    this.gtmService.sendGTMEvent('header', { action: 'show signup popup' });
  }

  // Close all popups
  closePopups() {
    this.isLoginPopupVisible = false;
    this.isSignupPopupVisible = false;
  }

  // Handle user login and send GTM event
  handleUserLoggedIn(userName: string) {
    this.userName = userName;
    this.storageService.setItem('user_name', userName);
    this.gtmService.sendGTMEvent('header', { action: 'user logged in', userName });
  }

  // Handle user registration and send GTM event
  handleUserRegistered(userName: string) {
    this.userName = userName;
    this.storageService.setItem('user_name', userName);
    this.gtmService.sendGTMEvent('header', { action: 'user registered', userName });
  }

  // Scroll to footer and send GTM event
  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.gtmService.sendGTMEvent('header', { action: 'scroll to footer' });
    }
  }

  // Track navigation link clicks
  trackNavigation(linkName: string) {
    this.gtmService.sendGTMEvent('header', { action: 'navigation click', linkName });
  }
}

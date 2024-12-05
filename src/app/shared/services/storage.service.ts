import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean;
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.userNameSubject.next(this.getItem('user_name')); // Initialize with stored value
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
      if (key === 'user_name') {
        this.userNameSubject.next(value); // Update BehaviorSubject
      }
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
      if (key === 'user_name') {
        this.userNameSubject.next(null); // Clear BehaviorSubject
      }
    }
  }

  clearStorage(): void {
    if (this.isBrowser) {
      localStorage.clear(); // Clear all stored items
      this.userNameSubject.next(null);
    }
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GTMService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  sendGTMEvent(event: string, payload: any): void {
    if (this.isBrowser) {
      // Execute only in the browser
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...payload });
    } else {
      console.warn(`GTM event '${event}' skipped because it's running on the server.`);
    }
  }
}

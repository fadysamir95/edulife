import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'ar';
  }

  getLanguageSpecificData(data: any): any {
    const lang = this.getCurrentLanguage();
    return lang === 'ar' ? data.ar : data.en;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = environment.baseUrl;
  private settingsSubject = new BehaviorSubject<any>(null);
  settings$ = this.settingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getSettings(): Observable<Record<string, any>> {
    const url = `${this.baseUrl}settings`;
    return this.http.get<{ data: { key: string; value: any }[] }>(url).pipe(
      map((response) => {
        const settings: Record<string, any> = {};
        response.data.forEach((item) => {
          settings[item.key] = item.value;
        });
        return settings;
      }),
      catchError((error) => {
        console.error('Error fetching settings:', error);
        throw error;
      }),
    );
  }

  /**
   * Fetch countries data from the API
   */
  getCountries(
    lang: string = 'ar',
  ): Observable<{ id: number; name: string }[]> {
    const url = `${this.baseUrl}get-countries?lang=${lang}`;
    return this.http
      .get<{ data: { id: number; name: string }[] }>(url)
      .pipe(map((response) => response.data));
  }
  /**
   * Fetch cities data from the API
   */
  getCities(body: {
    country_id: number;
    lang: string;
  }): Observable<{ id: number; name: string }[]> {
    const url = `${this.baseUrl}get-cites`;
    return this.http
      .post<{ data: { id: number; name: string }[] }>(url, body)
      .pipe(map((response) => response.data));
  }

  getBestSellers(lang: string = 'ar'): Observable<{ data: any[] }> {
    const url = `${this.baseUrl}get_diplomas_best_seller?lang=${lang}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      catchError((error) => {
        console.error('Error fetching best sellers:', error);
        throw error;
      }),
    );
  }

  setDataSettings(data: any): void {
    this.settingsSubject.next(data); // Update the settings
  }

  getDataSettings(): any {
    return this.settingsSubject.getValue(); // Get the current value synchronously
  }

  /**
   * Fetch Instagram Feeds
   */
  getInstagramFeeds(accessToken: any): Observable<any[]> {
    const apiUrl = 'https://graph.instagram.com/me/media';
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink';
    const url = `${apiUrl}?fields=${fields}&access_token=${accessToken}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching Instagram feeds:', error);
        throw error;
      }),
    );
  }

  subscribeToCourse(
    courseId: number,
    data: { address: string; image: File },
    lang: string = 'ar',
  ): Observable<any> {
    const url = `${this.baseUrl}subscribe_course/${courseId}?lang=${lang}`;
    const formData = new FormData();

    formData.append('address', data.address);
    formData.append('image', data.image); // Handle single file

    return this.http.post(url, formData).pipe(
      catchError((error) => {
        console.error('Error subscribing to course:', error);
        throw error;
      }),
    );
  }
}

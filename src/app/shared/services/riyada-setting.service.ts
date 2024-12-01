import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = environment.baseUrl;

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
      })
    );
  }

    /**
   * Fetch countries data from the API
   */
    getCountries(lang: string = 'ar'): Observable<{ id: number; name: string }[]> {
        const url = `${this.baseUrl}get-countries?lang=${lang}`;
        return this.http.get<{ data: { id: number; name: string }[] }>(url).pipe(
          map((response) => response.data)
        );
      }
  
  
  
}

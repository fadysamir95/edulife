import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  /**
   * Sends a login request to the server
   * @param credentials - The user's login data (e.g., email, password)
   * @returns Observable of the HTTP response
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials);
  }

  /**
   * Sends a registration request to the server
   * @param userDetails - The user's registration data
   * @returns Observable of the HTTP response
   */
  register(userDetails: {
    name: string;
    email: string;
    phone: string;
    password: string;
    country_id: number;
    city_id: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, userDetails);
  }
}

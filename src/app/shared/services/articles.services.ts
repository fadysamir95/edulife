import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllArticles(lang: string = 'ar'): Observable<{ data: any[] }> {
    const url = `${this.baseUrl}get_posts?lang=${lang}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      catchError((error) => {
        console.error('Error fetching articles:', error);
        return throwError(error);
      })
    );
  }

  getArticleBySlug(slug: string, lang: string = 'ar'): Observable<{ data: any }> {
    const url = `${this.baseUrl}get_posts_by_slug/${slug}?lang=${lang}`;
    return this.http.get<{ data: any }>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching article with slug ${slug}:`, error);
        return throwError(error);
      })
    );
  }
}

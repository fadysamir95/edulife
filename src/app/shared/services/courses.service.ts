import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllCourses(lang: string = 'ar'): Observable<{ data: any[] }> {
    const url = `${this.baseUrl}get_cates_diplomas?lang=${lang}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      catchError((error) => {
        console.error('Error fetching best sellers:', error);
        throw error;
      })
    );
  }

  getCoursesById(id: number, lang: string = 'ar'): Observable<{ data: any[] }> {
    const url = `${this.baseUrl}get_diplomas_by_cate/${id}?lang=${lang}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching courses for category ${id}:`, error);
        throw error;
      })
    );
  }

  fetchDiplomaDetails(slug: string, lang: string = 'ar'): Observable<{ data: any }> {
    const url = `${this.baseUrl}get_diplomas_details_by_slug/${slug}?lang=${lang}`;
    return this.http.get<{ data: any }>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching diploma details for slug ${slug}:`, error);
        return throwError(() => error);
      })
    );
  }
  
  

}

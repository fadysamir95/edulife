import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add custom headers
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json', // Ensure JSON requests
        'Cache-Control': 'no-cache, no-store, must-revalidate', // No caching
        Pragma: 'no-cache', // HTTP/1.0 compatibility
        Expires: '0', // Prevent caching
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error); // Log for debugging

        if (error.status === 0) {
          this.notificationService.showError(
            'Network error occurred. Please check your connection and try again.'
          );
        } else {
          const errorMessage = this.getErrorMessage(error);
          this.notificationService.showError(errorMessage);
        }

        return throwError(() => new Error(error.message || 'An unknown error occurred.'));
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Bad Request: Please check your input and try again.';
      case 401:
        return 'Unauthorized: Please log in to access this resource.';
      case 403:
        return 'Forbidden: You do not have permission to access this resource.';
      case 404:
        return 'Not Found: The requested resource could not be found.';
      case 500:
        return 'Internal Server Error: Please try again later.';
      case 503:
        return 'Service Unavailable: The server is currently unavailable. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }
}

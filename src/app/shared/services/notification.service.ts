import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  // Success notification
  showSuccess(message: string, title: string = 'Success'): void {
    this.toastr.success(message, title);
  }

  // Error notification
  showError(message: string, title: string = 'Error'): void {
    this.toastr.error(message, title);
  }

  // Info notification
  showInfo(message: string, title: string = 'Info'): void {
    this.toastr.info(message, title);
  }

  // Warning notification
  showWarning(message: string, title: string = 'Warning'): void {
    this.toastr.warning(message, title);
  }
}

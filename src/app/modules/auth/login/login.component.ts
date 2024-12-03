import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],

})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() userLoggedIn = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  storageService = inject(StorageService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.storageService.setItem('access_token', response?.data.access_token);
          const userName = response.data.name || 'User';
          this.userLoggedIn.emit(userName);

          this.closePopup();
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
    }
  }
}

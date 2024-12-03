import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() userRegistered = new EventEmitter<string>(); // Emit username on successful signup

  private fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  storageService = inject(StorageService);

  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    country_id: [0, [Validators.required]],
    city_id: [0, [Validators.required]],
  });

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.storageService.setItem('access_token', response?.data.access_token);
          const userName = response?.data.name || 'User';
          this.userRegistered.emit(userName);
          this.closePopup(); 
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    }
  }
}

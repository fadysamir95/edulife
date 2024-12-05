import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { StorageService } from '../../../shared/services/storage.service';
import { SettingsService } from '../../../shared/services/riyada-setting.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() userRegistered = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  storageService = inject(StorageService);
  settingsService = inject(SettingsService);

  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    country_id: [null, [Validators.required]], // Required for country selection
    city_id: [null, [Validators.required]], // Required for city selection
  });

  countries: { id: number; name: string }[] = [];
  cities: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.loadCountries(); // Fetch countries on component load
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.storageService.setItem('access_token', response?.data.access_token);
          this.storageService.setItem('user_name', response?.data.name);
          this.userRegistered.emit(response?.data.name);
          this.closePopup();
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  loadCountries() {
    this.settingsService.getCountries('ar').subscribe({
      next: (countries) => {
        this.countries = countries;
        console.log('Countries loaded:', countries);
      },
      error: (error) => {
        console.error('Failed to load countries:', error);
      },
    });
  }

  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Safely cast the event target
    const countryId = target?.value ? parseInt(target.value, 10) : null;
  
    if (countryId) {
      this.signupForm.get('city_id')?.setValue(null); // Reset city selection
      this.loadCities(countryId); // Fetch cities for the selected country
    } else {
      console.error('Invalid country selection');
    }
  }
  

  loadCities(countryId: number) {
    this.settingsService.getCities({ country_id: countryId, lang: 'ar' }).subscribe({
      next: (cities) => {
        this.cities = cities;
        console.log('Cities loaded for country_id:', countryId, cities);
      },
      error: (error) => {
        console.error('Failed to load cities:', error);
      },
    });
  }
}


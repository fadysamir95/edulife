import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SettingsService } from '../../shared/services/riyada-setting.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  baseUrl = environment.baseUrl;
  aboutSloganImage: string | null = null;
  settingsInfo: any;
  settingsService = inject(SettingsService);
  router = inject(Router)
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    margin: 20,
    navText: ['', ''],
    rtl: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.getSettingsData()
  }

  getSettingsData() {
    this.settingsService.getSettings().subscribe((response: any) => {
      this.settingsService.setDataSettings(response); // Store settings in the service
      this.settingsInfo = response;
      console.log(response);
    });
  }

}
import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../shared/services/riyada-setting.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  settingsService = inject(SettingsService);
  settingsInfo: any;
  vision_ar: string | null = null;
  target_ar: string | null = null
  staticties_ar: string | null = null;
  mision_ar: string | null = null;

  ngOnInit(): void {
    this.getSettingsData()
  }

  getSettingsData() {
    this.settingsService.getSettings().subscribe((response: any) => {
      this.settingsInfo = response;
      console.log(response);
    });
  }

}

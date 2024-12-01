import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../shared/services/riyada-setting.service';

@Component({
  selector: 'app-home-highlights',
  templateUrl: './home-highlights.component.html',
})
export class HomeHighlightsComponent implements OnInit {
  settings: Record<string, any> | null = null;
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    this.fetchSettings();
  }

  /**
   * Fetch settings data from the SettingsService
   */
  fetchSettings(): void {
    this.settingsService.getSettings().subscribe((data) => {
      this.settings = data;
      console.log(this.settings, 'the settings')
    });
  }
}

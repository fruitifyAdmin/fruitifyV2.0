import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrl: './events-landing.component.scss'
})
export class EventsLandingComponent {

  isDarkTheme = false;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDark();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDark();
  }

}

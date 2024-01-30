import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {

  isDarkTheme = false;
  themeSwitch = false;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDark();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDark();
  }
}

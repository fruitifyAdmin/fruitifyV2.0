import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  isDark() {
    return this.isDarkTheme;
  }
}

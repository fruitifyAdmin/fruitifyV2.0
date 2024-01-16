import { Component } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { warn } from 'console';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrl: './events-landing.component.scss'
})
export class EventsLandingComponent {

  isDarkTheme = false;
  themeSwitch = false;
  dateVar = new Date();
  monthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  weekDateArr = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  currentMonth = "";
  currentYear: any;
  weekArr: any = [];
  weekDayArr: any = [];

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDark();
  }
  
  ngOnInit() {
    this.currentMonth = this.monthsArr[this.dateVar.getMonth()];
    this.currentYear = this.dateVar.getFullYear();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(this.dateVar);
      nextDay.setDate(this.dateVar.getDate() + i);
      this.weekArr.push(nextDay.getDate());
      this.weekDayArr.push(nextDay.getDay());
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDark();
  }

}

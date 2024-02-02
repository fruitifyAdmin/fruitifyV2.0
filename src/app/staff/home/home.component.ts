import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StaffService } from '../staff.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('children', [
        state('collapsed', style({
            height: '0'
        })),
        state('expanded', style({
            height: '*'
        })),
        transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class HomeComponent {

  isDarkTheme = false;
  themeSwitch = false;
  isMenuLoaded = false;
  menu: any[] = [];
  activeMenuItem = "";

  constructor(private staffService: StaffService, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDark();
  }

  ngOnInit() {
    this.staffService.menuCategoryCollection.doc("menuCategories").collection("categoriesCollection").valueChanges({idField: 'id'})
    .subscribe((res: any) => {
      this.menu = [];
      this.isMenuLoaded = false;
      res.forEach((menuCategory: any) => {
        this.menu.push(menuCategory);
        this.addSubMenu(menuCategory);
      })
      this.menu = this.menu.sort((a: any, b: any) => a.label.localeCompare(b.label))
    }, err => {
          console.warn(err);
    }, () => {
      
    });
}

  addSubMenu(menuCategory: any) {
    this.staffService.menuCategoryCollection.doc("menuCategories").collection(menuCategory['label']).valueChanges({ idField: 'id' }).subscribe((res: any) => {
      var items: any = [];
      const adminIndex = this.menu.findIndex(item => item.label === menuCategory['label']);
      this.menu[adminIndex].items = []
      res.forEach((item: any) => {
        items.push(item);
      })
      items = items.sort((a: any, b: any) => a.label.localeCompare(b.label))
      this.menu[adminIndex]['items'] = items;
      setTimeout(() => {
        if (!this.activeMenuItem) {
          if (this.menu[0].items[0]) {
            this.activeMenuItem = this.menu[0].items[0].label
          } else {
            this.activeMenuItem = this.menu[1].items[0].label
          }
        }
        this.isMenuLoaded = true;
      }, 100);
    })
  }

sortMenu() {
  setTimeout(() => {
    this.menu = this.menu.sort((a, b) => a.label.localeCompare(b.label));
    this.menu = this.menu.map(item => ({
      ...item,
      items: item.items.sort((a: any, b: any) => a.label.localeCompare(b.label))
    }));
    if(!this.activeMenuItem) {
      if(this.menu[0].items[0]) {
        this.activeMenuItem = this.menu[0].items[0].label
      } else {
        this.activeMenuItem = this.menu[1].items[0].label
      }
    }
    this.isMenuLoaded = true;
  }, 500);
}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDark();
  }

  toggle() {
    var ele = document.getElementsByClassName("sideBar")[0] as HTMLElement;
    var eleMain = document.getElementsByClassName("layout-main-container")[0] as HTMLElement;
    if(ele.classList.contains("sideBarInactive")) {
      ele.classList.remove("sideBarInactive")
      eleMain.classList.remove("layout-main-containerExpanded")
    } else {
      ele.classList.add("sideBarInactive");
      eleMain.classList.add("layout-main-containerExpanded")
    }
  }

  updateActiveMenu(menuItem: string) {
    this.activeMenuItem = menuItem
  }
}

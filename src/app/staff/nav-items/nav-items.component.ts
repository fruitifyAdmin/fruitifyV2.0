import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.scss',
})
export class NavItemsComponent implements OnInit {

  todayDate = new FormControl(new Date());

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  selectedCategortName: string | undefined;
  selectedItem: any;
  @Input() menuCategories: any;
  showAddCategory: boolean = false;
  showAddItem: boolean = false;
  showCategoryInfo: boolean = false;
  showItemInfo: boolean = false;
  showEditCategory: boolean = false;
  showEditItem: boolean = false;
  showDeleteCategory: boolean = false;
  showDeleteItem: boolean = false;
  addCategoryGroup: FormGroup | any;
  addItemGroup: FormGroup | any;
  categoryInfoGroup: FormGroup | any;
  itemInfoGroup: FormGroup | any;
  formGroup: FormGroup | any;
  expandedRows: string[] = [];
  menuListArr: any[] = [];

  constructor(private fb: FormBuilder, private staffService: StaffService) {}

  ngOnInit() {
    this.menuCategories.forEach((menuItem: any) => {
      var obj = {
        name: menuItem.label,
        value: menuItem.label
      }
      this.menuListArr.push(obj);
    });
    this.items = [
      { label: 'Categories', icon: 'pi pi-fw pi-folder' },
      { label: 'Items', icon: 'pi pi-fw pi-file' },
    ];
    this.activeItem = this.items[0];
    this.addCategoryGroup = this.fb.group({
      categoryName: [null],
      isActive: [false],
      adminFeature: [false],
    })
    this.addItemGroup = this.fb.group({
      categoryName: [null],
      itemName: [null],
      icon: [null],
      isActive: [false],
    })
    this.categoryInfoGroup = this.fb.group({
      categoryName: [null],
      isActive: [false],
      adminFeature: [false],
    })
    this.itemInfoGroup = this.fb.group({
      itemName: [null],
      icon: [null],
      isActive: [false],
    })
  }

  onActiveItemChange(event: any) {
    this.activeItem = event
  }

  openAddCategory() {
    this.showAddCategory = true;
  }
  
  closeAddCategory() {
    this.showAddCategory = false;
  }

  closeAddItem() {
    this.showAddItem = false;
  }

  addCategory() {
    var obj = {
      "label": this.addCategoryGroup.controls['categoryName'].value,
      "isActive": this.addCategoryGroup.controls['isActive'].value,
      "adminFeature": this.addCategoryGroup.controls['adminFeature'].value,
      "timeStamp": this.todayDate.value?.valueOf()
    }
    this.staffService.addSideMenuCategories(obj);
    setTimeout(() => {
      this.showAddCategory = false
    }, 100);
  }

  addItem() {
    var obj = {
      "label": this.addItemGroup.controls['itemName'].value,
      "icon": this.addItemGroup.controls['icon'].value,
      "isActive": this.addItemGroup.controls['isActive'].value,
      "timeStamp": this.todayDate.value?.valueOf()
    }
    this.staffService.addSideMenuItem(this.addItemGroup.controls['categoryName'].value ,obj);
    setTimeout(() => {
      this.closeAddItem();
    }, 100);
  }

  openCategoryInfo(selectedCategory: any) {
    this.showCategoryInfo = true
    this.categoryInfoGroup.controls['categoryName'].setValue(selectedCategory.label);
    this.categoryInfoGroup.controls['isActive'].setValue(selectedCategory.isActive);
    this.categoryInfoGroup.controls['adminFeature'].setValue(selectedCategory.adminFeature);
    this.categoryInfoGroup.controls['categoryName'].disable();
    this.categoryInfoGroup.controls['isActive'].disable();
    this.categoryInfoGroup.controls['adminFeature'].disable();
  }

  openItemInfo(selectedCategory: any, selectedItem: any) {
    const adminIndex = selectedCategory.items.findIndex((item: any) => item.label === selectedItem['label']);
    this.showItemInfo = true
    this.itemInfoGroup.controls['itemName'].setValue(selectedCategory.items[adminIndex].label);
    this.itemInfoGroup.controls['icon'].setValue(selectedCategory.items[adminIndex].icon);
    this.itemInfoGroup.controls['isActive'].setValue(selectedCategory.items[adminIndex].isActive);
    this.itemInfoGroup.controls['itemName'].disable();
    this.itemInfoGroup.controls['icon'].disable();
    this.itemInfoGroup.controls['isActive'].disable();
  }

  openEditCategory(selectedCategory: any) {
    this.showEditCategory = true
    this.categoryInfoGroup.controls['categoryName'].setValue(selectedCategory.label);
    this.categoryInfoGroup.controls['isActive'].setValue(selectedCategory.isActive);
    this.categoryInfoGroup.controls['adminFeature'].setValue(selectedCategory.adminFeature);
    this.categoryInfoGroup.controls['categoryName'].enable();
    this.categoryInfoGroup.controls['isActive'].enable();
    this.categoryInfoGroup.controls['adminFeature'].enable();
  }

  openEditItem(selectedCategory: any, selectedItem: any) {
    this.showEditItem = true
    const adminIndex = selectedCategory.items.findIndex((item: any) => item.label === selectedItem['label']);
    this.selectedItem = selectedCategory.items[adminIndex];
    this.itemInfoGroup.controls['itemName'].setValue(selectedCategory.items[adminIndex].label);
    this.itemInfoGroup.controls['icon'].setValue(selectedCategory.items[adminIndex].icon);
    this.itemInfoGroup.controls['isActive'].setValue(selectedCategory.items[adminIndex].isActive);
    this.itemInfoGroup.controls['itemName'].enable();
    this.itemInfoGroup.controls['icon'].enable();
    this.itemInfoGroup.controls['isActive'].enable();
  }

  editCategory(id: any) {
    var obj = {
      "label": this.categoryInfoGroup.controls['categoryName'].value,
      "isActive": this.categoryInfoGroup.controls['isActive'].value,
      "adminFeature": this.categoryInfoGroup.controls['adminFeature'].value,
      "timeStamp": this.todayDate.value?.valueOf()
    }
    this.staffService.editSideMenuCategories(obj, id);
    setTimeout(() => {
      this.showEditCategory = false
    }, 200);
  }

  editItem(selectedCategory: any, id: any) {
    var obj = {
      "label": this.itemInfoGroup.controls['itemName'].value,
      "icon": this.itemInfoGroup.controls['icon'].value ? this.itemInfoGroup.controls['icon'].value : '',
      "isActive": this.itemInfoGroup.controls['isActive'].value ? this.itemInfoGroup.controls['isActive'].value : false,
      "timeStamp": this.todayDate.value?.valueOf()
    }
    this.staffService.editSideMenuItem(selectedCategory.label ,obj, this.selectedItem?.id);
    setTimeout(() => {
      this.showEditItem = false
    }, 10);
  }

  closeEditCategory() {
    this.showEditCategory = false
  }

  closeEditItem() {
    this.showEditItem = false
  }

  openDeleteCategory() {
    this.showDeleteCategory = true
  }

  openDeleteItem() {
    this.showDeleteItem = true
  }

  closeDeleteItem() {
    this.showDeleteItem = false
  }

  closeDeleteCategory() {
    this.showDeleteCategory = false
  }

  deleteCategory(id: any) {
    this.staffService.deleteSideMenuCategories(id);
    this.showDeleteCategory = false;
  }

  deleteItem(selectedCategory: any, id: any) {
    this.staffService.deleteSideMenuItem(selectedCategory, this.selectedItem.id);
    this.showDeleteItem = false;
  }

  openAddItem() {
    this.showAddItem = true;
  }

  toggleRow(item: any): void {
    const index = this.expandedRows.indexOf(item.id);
    if (index !== -1) {
      this.expandedRows.splice(index, 1);
    } else {
      this.expandedRows.push(item.id);
    }
  }
  
  isRowExpanded(item: any): boolean {
    return this.expandedRows.includes(item.id);
  }

  openPrimeIcons() {
    window.open("https://primeng.org/icons", "_blank")
  }
}

import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StaffService } from '../staff.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeOrders: any[] = [];
  ordersListLoading = false;
  showAddBill = false;
  addBillGroup: FormGroup | any;
  date2: Date | null | undefined;
  todayDate = new FormControl(new Date())
  onlineSourceArr: any[] = []
  usersDb: string[] = [];
  users: string[] = [];
  filteredUsers: any[] = [];
  filteredCountries: any[] = [];
  userNames: string[] = [];
  itemsList: any[] = [];
  constructor(private fb: FormBuilder, private staffService: StaffService) {}

  ngOnInit() {
    this.items = [
      { label: 'Dine In', icon: 'fa-solid fa-bowl-food' },
      { label: 'Online', icon: 'fa-solid fa-truck' },
    ];
    this.onlineSourceArr = [
      {
        name: 'Swiggy',
        value: 'Swiggy'
      },
      {
        name: 'Zomato',
        value: 'Zomato'
      },
    ]
    this.activeItem = this.items[0]
    this.updateOrderList()
    this.getCustomerMobileList();
    this.addBillGroup = this.fb.group({
      orderDate: [null],
      orderType: [null],
      tableNo: [null],
      customerMobile: [null],
      customerName: [null],
    })
    this.addBillGroup.controls['orderDate'].setValue(this.todayDate.value);
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
    this.updateOrderList();
  }

  updateOrderList() {
    this.ordersListLoading = true;
    this.staffService.ordersCollection.doc("onGoingOrders").collection(this.activeItem?.label!).valueChanges({idField: 'id'}).subscribe((items: any) => {
      this.activeOrders = items;
      this.ordersListLoading = false;
    }) 
  }

  getCustomerMobileList() {
    this.staffService.customerCollection.valueChanges({idField: 'id'}).subscribe((items: any) => {
      this.usersDb = items;
      for (let index = 0; index < items.length; index++) {
        this.users.push(items[index].id);
        this.userNames.push(items[index].userName);
      }
    });
  }

  getOrderStatus(order: any): number {
    let res = 0;
    var totalItems = order.items.length
    var completed = 0
    order.items.forEach((item: any) => {
      if(item.isDone) {
        completed += 1
      }
    });
    res = (completed/totalItems) * 100;
    return res
  }

  openAddBill() {
    this.showAddBill = true;
    this.addBillGroup.controls['orderType'].setValue(this.activeItem?.label);
  }

  closeAddItem() {
    this.showAddBill = false;
  }

  addBill() {

  }

  filterByMobile(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.usersDb.length; i++) {
      let mobileNumber = (this.usersDb as any[])[i];
      if (mobileNumber.userMobile.indexOf(query) != -1) {
        filtered.push(mobileNumber);
      }
    }
    this.filteredUsers = filtered;
  }

  filterByName(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.usersDb.length; i++) {
      let mobileNumber = (this.usersDb as any[])[i];
      if (mobileNumber.userName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(mobileNumber);
      }
    }
    this.filteredUsers = filtered;
  }

  updateUserDetails(event: any) {
    this.addBillGroup.controls['customerMobile'].setValue(event.value.userMobile);
    this.addBillGroup.controls['customerName'].setValue(event.value.userName);
  }

  updateItems(data: any) {
    this.itemsList = data;
    // this.getCartTotal(this.itemsList);
  }
}

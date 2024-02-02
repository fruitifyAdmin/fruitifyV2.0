import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.scss'
})
export class PastOrdersComponent {
  
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeOrders: any[] = [];
  ordersListLoading = false;
  date2: Date | null | undefined;
  todayDate = new FormControl(new Date())
  ordersList: any[] = [];

  constructor(private staffService: StaffService) {
    // this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.items = [
      { label: 'Dine In', icon: 'fa-solid fa-truck' },
      { label: 'Online', icon: 'fa-solid fa-bowl-food' },
    ];
    this.activeItem = this.items[0];
    this.date2 = this.todayDate.value;
    this.updateOrderList()
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
    this.updateOrderList()
  }

  updateSelectedDate() {
    this.updateOrderList()
  }

  updateOrderList() {
    this.ordersListLoading = true;
    this.staffService.getPastOrders(this.activeItem?.label == 'Online' ? this.activeItem.label : 'Offline' , this.date2?.valueOf()).subscribe((res: any) => {
      this.ordersList = res.docs.map((doc: any) => doc.data()) 
      this.ordersListLoading = false;
    })   
  }

}

import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StaffService } from '../staff.service';

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

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.items = [
      { label: 'Dine In', icon: 'fa-solid fa-truck' },
      { label: 'Online', icon: 'fa-solid fa-bowl-food' },
    ];
    this.activeItem = this.items[0]
    this.updateOrderList()
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
 
}

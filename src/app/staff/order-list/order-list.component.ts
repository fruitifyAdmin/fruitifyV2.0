import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { OrderListService } from '../order-list.service';
import { StaffService } from '../staff.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  itemName = ''
  itemUnitPrice =''
  itemQuantity =''
  cartValue = 0;
  orderItems: any = [];
  itemsList: any = [];
  menuItemControl = new FormControl('');
  filteredMenuItems: any[] = [];
  @Input() items: any;
  @Output() itemsListData = new EventEmitter<string>();
  menuItems: any [] = [];
  menu: any [] = [];
  itemNameValue = '';

  constructor(private orderListService: OrderListService, private staffService: StaffService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.orderItems = this.items.sort((a:any, b:any) => a.isDone - b.isDone)    
  }

  ngOnInit(): void {  
    // this.filteredMenuItems = this.menuItemControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    this.staffService.getFoodMenuCategories().subscribe((res: any) => {
      res.forEach((item: any) => {                
        this.staffService.getFoodMenuItems(item.data().creationDetails[0].categoryName).subscribe((menuItem: any) => {
          menuItem.forEach((activeItem: any) => {     
            this.menu.push(activeItem.data())       
            this.menuItems.push(activeItem.data())
          })
        })
      })
    })  
  }

  filterByName(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.menuItems.length; i++) {
      let menuItem = (this.menuItems as any[])[i];
      if (menuItem.itemName.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(menuItem);
      }
    }
    this.filteredMenuItems = filtered;
  }

  _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);    
    return this.menuItems.filter(menuItems => this._normalizeValue(menuItems).includes(filterValue));
  }

  private _normalizeValue(value: string): string {        
    return value.toLowerCase().replace(/\s/g, '');
  }

  addItem() {    
    var obj: any = this.menuItemControl.value
    var itemObj = {
      "itemName": obj.itemName,
      "itemUnitPrice": this.itemUnitPrice,
      "itemQuantity": this.itemQuantity,
      "itemTotal": parseInt(this.itemUnitPrice) * parseInt(this.itemQuantity),
      "isDone": false
    }
    console.warn(this.orderItems);
    
    if(this.orderItems.length > 0) {
      if(obj.itemName.length > 0) {
        this.orderItems.push(itemObj)      
        this.itemsListData.emit(this.orderItems)
        this.menuItemControl.setValue('');
        this.itemQuantity = ''
        this.itemUnitPrice = ''
        this.getCartTotal(this.orderItems)
      }
    } else {
      if(obj.itemName.length > 0) {
        this.itemsList.push(itemObj)      
        this.itemsListData.emit(this.itemsList)
        this.menuItemControl.setValue('');
        this.itemQuantity = ''
        this.itemUnitPrice = ''
        this.getCartTotal(this.itemsList)
      }
    }
    console.warn(this.orderItems);

  }

  getCartTotal(items: any) {
    this.cartValue = 0;
    if(this.orderItems.length > 0) {
      this.orderItems.forEach((item: any) => {
        item.itemTotal = item.itemUnitPrice * item.itemQuantity
        this.cartValue += item.itemUnitPrice * item.itemQuantity
      });
    }
    this.itemsList.forEach((item: any) => {
      this.cartValue += item.itemUnitPrice * item.itemQuantity
    });
  }

  onStatusChange(id: string, newStatus: boolean) {
    if(this.orderItems.length > 0) {
      this.orderItems.forEach((item: any) => {
        if(item.itemName == id) {
          item.isDone = newStatus
        }
        this.itemsListData.emit(this.orderItems)
        this.getCartTotal(this.orderItems)
      })
    } else {
      this.itemsList.forEach((item: any) => {
        if(item.itemName == id) {
          item.isDone = newStatus
        }
        this.itemsListData.emit(this.itemsList)
        this.getCartTotal(this.itemsList)
      })
    }
    
  }

  removeItem(id: string) {
    if(this.orderItems.length > 0) {
      this.orderItems.forEach((item: any) => {
        if(item.itemName == id) {
          this.orderItems.splice(this.orderItems.indexOf(item), 1)
        }
        this.itemsListData.emit(this.orderItems)
        this.getCartTotal(this.orderItems)
      })
    } else {
      this.itemsList.forEach((item: any) => {
        if(item.itemName == id) {
          this.itemsList.splice(this.itemsList.indexOf(item), 1)
        }
        this.itemsListData.emit(this.itemsList)
        this.getCartTotal(this.itemsList)
      })
    }
  }

  updateItemDetails() {
    var obj: any = this.menuItemControl.value;
    this.menu.forEach((item) => {
      if(item.itemName == obj.itemName) {   
        this.itemUnitPrice = item.price
        this.itemQuantity = "1"
        
      }
    })
  }

  changeQuantity(item: any, operator: any) {
    if(this.orderItems.length > 0) {
      this.orderItems.forEach((orderItem: any) => {
        if(orderItem.itemName == item) {
          if(operator == 'inc') {
            orderItem.itemQuantity = (parseInt(orderItem.itemQuantity) + 1).toString()
          } else {
            orderItem.itemQuantity = (parseInt(orderItem.itemQuantity) - 1).toString()
          }
        }
        this.getCartTotal(this.orderItems)
        this.itemsListData.emit(this.orderItems)
      })
    } else {
      this.itemsList.forEach((orderItem: any) => {
        if(orderItem.itemName == item) {
          if(operator == 'inc') {
            orderItem.itemQuantity = (parseInt(orderItem.itemQuantity) + 1).toString()
          } else {
            orderItem.itemQuantity = (parseInt(orderItem.itemQuantity) - 1).toString()
          }
        }
        
        this.getCartTotal(this.itemsList)
        this.itemsListData.emit(this.itemsList)
      })
    }
  }

}

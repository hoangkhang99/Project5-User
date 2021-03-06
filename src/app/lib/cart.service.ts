import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
  }
  
  addToCart(item) {
    item.quantity = 1;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [item];
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      let ok = true;
      for (let x of local_storage) {
        if (x.productId == item.productId) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  getItems() {
    var totalMoneys = 0;
    var totalQtys = 0;
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }

  deleteItem(productId) {
    let local_storage = this.getItems().filter((x) => x.productId != productId);
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  addQty(item) {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    for (let x of local_storage) {
      if (x.productId == item.productId) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    return local_storage.length;
  }



  clearCart() {
   localStorage.removeItem('cart');
   this.itemsSubject.next(null);
  }

}

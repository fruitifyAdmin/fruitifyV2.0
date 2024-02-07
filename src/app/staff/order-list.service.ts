import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {
  fireStoreCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.fireStoreCollection = fireStore.collection('ongoingOrders');
   }

   updateItemStatus(id: string, newStatus: boolean) {
    this.fireStoreCollection.doc(id).update({isDone: newStatus})
   }

   deleteItem(id: string) {
    this.fireStoreCollection.doc(id).delete();
   }
}

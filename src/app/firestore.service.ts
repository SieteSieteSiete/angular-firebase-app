import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  async addItem(item: any) {
    const colRef = collection(this.firestore, 'items');
    return addDoc(colRef, item);
  }

  async getItems() {
    const colRef = collection(this.firestore, 'items');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async populateTestData() {
    const testData = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 },
      { name: 'Item 3', value: 30 },
      { name: 'Item 4', value: 40 },
      { name: 'Item 5', value: 50 }
    ];

    for (const item of testData) {
      await this.addItem(item);
    }

    console.log('Test data populated successfully');
  }
}
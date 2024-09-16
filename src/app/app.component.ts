import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let doc of documents$ | async">
        {{ doc | json }}
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  documents$: Observable<any[]> = new Observable<any[]>();

  ngOnInit() {
    const collectionName = 'items';
    const collectionInstance = collection(this.firestore, collectionName);
    this.documents$ = collectionData(collectionInstance);
  }
}
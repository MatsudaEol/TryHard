import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgCircleProgressModule } from "ng-circle-progress";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }


  getUser(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').doc(uid).get().subscribe(doc => {
        if (doc.exists) {
          const userData: any = doc.data();
          resolve(userData);
        } else {
          reject('Usuário não encontrado.');
        }
      });
    });
  }

}

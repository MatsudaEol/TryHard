import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }

  getUserName(uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').doc(uid).get().subscribe(doc => {
        if (doc.exists) {
          const userData: any = doc.data();
          const userName: string = userData.username;
          resolve(userName);
        } else {
          reject('Usuário não encontrado.');
        }
      });
    });
  }
    
}

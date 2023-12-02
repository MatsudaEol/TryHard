import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage {
  segment = 'novas';
  notifications: Notification[] = [];
  welcome = true;
  userData: any;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private userService: UserService) {
    this.userData = {};
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userData = await this.userService.getUser(user.uid);
        this.userId = user.uid;
      }
    });
  }

  onItemSwipe(event: any) {
    console.log('Item deslizado!', event);
    this.deleteNotification();
  }

  async deleteNotification() {
    const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);
  
    await notificationRef.update({ welcome: false });

  }


async checkAndSetWelcomeStatus() {
  const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);
  const notificationDoc = await notificationRef.get().toPromise();

  if (notificationDoc.exists) {
    const notificationData = notificationDoc.data() as { welcome: boolean } | undefined;

    if (notificationData && typeof notificationData.welcome === 'boolean') {
      this.welcome = notificationData.welcome; // Define 'welcome' com o valor do Firestore
    }
  }
}

}

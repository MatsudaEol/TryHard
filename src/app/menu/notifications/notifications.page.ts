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
  welcome = false; // Inicialmente definido como falso
  userData: any;
  userId: string;
  checkedWelcomeStatus = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    this.userData = {};
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user && !this.checkedWelcomeStatus) {
        this.userData = await this.userService.getUser(user.uid);
        this.userId = user.uid;
        await this.checkAndSetWelcomeStatus();
      }
    });
  }

  async checkAndSetWelcomeStatus() {
    const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);
    const notificationDoc = await notificationRef.get().toPromise();

    if (notificationDoc.exists) {
      const notificationData = notificationDoc.data() as { welcome: boolean } | undefined;

      if (notificationData && typeof notificationData.welcome === 'boolean') {
        if (notificationData.welcome) {
          this.welcome = true; // Define 'welcome' como true para mostrar a notificação
        }
        this.checkedWelcomeStatus = true; // Define como true para evitar futuras verificações
      }
    }
  }

  onItemSwipe(event: any) {
    console.log('Item deslizado!', event);
    this.deleteNotification();
  }

  async deleteNotification() {
    const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);
    await notificationRef.update({ welcome: false });
    this.welcome = false; // Atualiza localmente para evitar exibir a notificação
  }
}




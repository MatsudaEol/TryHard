import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/user.service';

interface Notification {
  notificationId: string;
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  segment = 'novas';
  userData: any;
  userId: string;
  checkedWelcomeStatus = false;
  notifications: Notification[] = [];

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
        await this.getNotifications();
      }
    });
  }

  onItemSwipe(notificationId: string) {
    console.log('Item deslizado!', notificationId);
    this.deleteNotification(notificationId);
  }

  async deleteNotification(notificationId: string) {
    const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);

    // Filtrar a notificação a ser removida com base no notificationId
    this.notifications = this.notifications.filter(notification => notification.notificationId !== notificationId);

    try {
      await notificationRef.update({ notifications: this.notifications });
      console.log('Notificação removida com sucesso do Firestore!');
    } catch (error) {
      console.error('Erro ao remover a notificação:', error);
      // Tratar possíveis erros ou adicionar feedback para o usuário
    }
  }

  async getNotifications() {
    const notificationRef = this.firestore.collection('userNotifications').doc(this.userId);
    const notificationDoc = await notificationRef.get().toPromise();

    if (notificationDoc.exists) {
      const userData = notificationDoc.data() as { notifications: Notification[] } | undefined;
      if (userData && userData.notifications) {
        this.notifications = userData.notifications;
        console.log(this.notifications)
      }
    }
  }
  
}

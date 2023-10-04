import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage {
  segment = 'novas';
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

}
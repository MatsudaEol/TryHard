import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'], // Se você tiver um arquivo de estilo
})
export class NotificationsPage {
  segment = 'novas'; // Certifique-se de ter a propriedade 'segment' no seu componente
}

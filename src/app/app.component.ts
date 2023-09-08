import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.router.navigateByUrl('tabs'); // Redireciona para a página Home
      }, 3000); // Aguarde 3 segundos antes de redirecionar
    });
  }
}

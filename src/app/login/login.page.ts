import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    public alertController: AlertController
  ) {}

  async login() {
    if (this.username && this.password) {
      if (this.username === 'Vitor' && this.password === 'vitor123') {
        this.router.navigate(['/tabs/home']);
      } else {
        const alert = await this.alertController.create({
          message: 'Usuário ou senha incorretos.',
          buttons: ['OK']
        });

        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        message: 'Preencha os campos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

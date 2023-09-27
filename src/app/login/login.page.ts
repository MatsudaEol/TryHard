import { Component } from '@angular/core';
import { BdtempService } from '../services/bdtemp.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string;
  password: string;
  showAlert: boolean = false;
  alertMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private bdtempService: BdtempService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.username = '';
    this.password = '';
  }

  async login() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Erro de autenticação',
        message: 'Preencha os campos.',
        buttons: ['OK']
      });

      await alert.present();
      return; 
    }

    const users = this.bdtempService.obterUsuarios();
    const user = users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Erro de autenticação',
        message: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  showPassword: boolean = false;
  selectedGender: string = 'masculino'; // Valor padrão selecionado é 'masculino'

  constructor(public alertController: AlertController, private router: Router) { } // Injete o Router

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Insira suas Informações Pessoais!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Lidar com o cancelamento, se necessário
          }
        },
        {
          text: 'OK',
          handler: () => {
             // Após acessar as informações, você pode redirecionar o usuário para a página home
            this.router.navigate(['/tabs/home']);
          }
        }
      ],
      inputs: [
        {
          placeholder: 'Nome',
        },
        {
          placeholder: 'Nome de Usuário (max 8 caracteres)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Idade',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Escreva seu Gênero',
        },
      ],
    });

    await alert.present();
  }
}

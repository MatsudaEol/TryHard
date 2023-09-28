import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  showPassword: boolean = false;
  selectedGender: string = 'masculino';

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Preencha os Campos!',
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
            // Verifique se os campos estão preenchidos
            const inputFields = document.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;
            let fieldsEmpty = false;
            inputFields.forEach((input) => {
              if (input.value.trim() === '') {
                fieldsEmpty = true;
              }
            });

            if (!fieldsEmpty) {
              // Se os campos não estiverem vazios, redirecione para a página home
              this.router.navigate(['/tabs/home']);
            } else {
              // Exiba um alerta se os campos estiverem em branco
              this.alertController.create({
                header: 'Campos em Branco',
                message: 'Por favor, preencha todos os campos.',
                buttons: ['OK'],
              }).then(alert => alert.present());
            }
          }
        }
      ],
      inputs: [
        {
          placeholder: 'Nome',
        },
        {
          type: 'number',
          placeholder: 'Idade',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Gênero',
        },
      ],
    });

    await alert.present();
  }
}

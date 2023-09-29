import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  editarPerfil() {
    this.navCtrl.navigateForward('/editar-perfil');
  }

  accordionGroupChange = (ev: any) => {
    const collapsedItems = ['first', 'second', 'third'].filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja sair da conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Ação de cancelamento');
          }
        }, {
          text: 'Sair',
          cssClass: 'danger',
          handler: () => {
            this.sairDaConta();
          }
        }
      ]
    });

    await alert.present();
  }

  sairDaConta() {
    this.navCtrl.navigateRoot('/login');
  }

}

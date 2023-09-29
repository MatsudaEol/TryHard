import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(private navCtrl: NavController) {}

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

}

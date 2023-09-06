import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(private navCtrl: NavController) {}
  
  editarPerfil() {
    // Navegar para a página de edição de perfil
    this.navCtrl.navigateForward('/editar-perfil');
  }

  ngOnInit() {
  }

}

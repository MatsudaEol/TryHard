import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-list',
  templateUrl: 'home-list.page.html',
  styleUrls: ['home-list.page.scss'],
})
export class HomeListPage implements OnInit {
  usuarios: any[];

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    // Lógica de inicialização, se necessário
  }
}

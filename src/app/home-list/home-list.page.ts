import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home-list',
  templateUrl: 'home-list.page.html',
  styleUrls: ['home-list.page.scss'],
})
export class HomeListPage implements OnInit {
  alunos: string[] = ['Gabriel de Angelis Godoy', 'Vitor Gabriel Pinheiro', 'Daniel dos Santos Posebon '];
  usuarios: any[];


  listExercises: any[] = [];
  userData: any;
  userName: string;
  currentDay: string;
  clickedCards: { [key: number]: boolean } = {};
  formattedDate: string;
  dataAtual: string;


  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore
  ) {
    this.userData = {};
  }

  async ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userData = await this.userService.getUser(user.uid);
        if (this.userData.username) {
          this.userName = this.userData.username;
        } else {
          this.userName = 'Visitante';
        }

        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const today = new Date().getDay();
        this.currentDay = daysOfWeek[today];

        const currentDate = new Date().toISOString().split('T')[0];
        this.dataAtual = currentDate;
        this.fetchUsuarios();
      }
      this.formattedDate = this.formatDate(new Date());
    });

  }



  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = date.toLocaleDateString('pt-BR', options);

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return capitalizeFirstLetter(dateStr);
  }


  async closePopover() {
    await this.popoverController.dismiss();
  }

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
            this.logout(); // Chama a função de logout após a confirmação
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }).catch(error => {
      console.log('Erro ao fazer logout:', error);
    });
  }

  fetchUsuarios() {
    this.firestore.collection('usuarios').valueChanges().subscribe((data) => {
      console.log('Usuarios Data:', data);

      if (data && data.length > 0) {
        this.usuarios = data as any[];
      } else {
        console.warn('No usuarios data found.');
      }
    });
  }
}


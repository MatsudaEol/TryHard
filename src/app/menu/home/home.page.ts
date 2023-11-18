import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listExercises: any[] = [];
  userData: any;
  userName: string;
  currentDay: string;
  clickedCards: { [key: number]: boolean } = {};
  formattedDate: string;

  constructor(
    private authService: AuthenticationService,
    public popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private exerciseService: ExerciseService,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore
  ) {
    this.userData = {};
  }

  async ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userData = await this.userService.getUser(user.uid);

        // Acessando o nome de usuário
        if (this.userData.username) {
          this.userName = this.userData.username;
        } else {
          this.userName = 'Visitante'; // Defina um valor padrão se o nome de usuário estiver ausente
        }

        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const today = new Date().getDay();
        this.currentDay = daysOfWeek[today];

        this.loadUserExercises(user.uid);

        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = `${todayDate.getMonth() + 1}`.padStart(2, '0');
        const day = `${todayDate.getDate()}`.padStart(2, '0');
        const dataAtual = `${year}-${month}-${day}`;

        const completedExercises = await this.verifyCompletedExercises(user.uid, dataAtual);
        console.log('Exercícios concluídos:', completedExercises);
      }
      this.formattedDate = this.formatDate(new Date());
    });
  }

  // Vai embora depois eu acho
  async verifyCompletedExercises(userId: string, dataAtual: string): Promise<any> {
    const docRef = this.firestore.collection('completedExercises').doc(userId);

    try {
      const doc = await docRef.get().toPromise();

      if (doc.exists) {
        const userData = doc.data();
        const completedExercises = userData[dataAtual];

        if (completedExercises) {
          return completedExercises;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao verificar exercícios concluídos:', error);
      return null;
    }
  }


  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = date.toLocaleDateString('pt-BR', options);

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return capitalizeFirstLetter(dateStr);
  }
  loadUserExercises(userId: string) {
    this.exerciseService.getExercises(userId).subscribe(exercicios => {
      this.listExercises = exercicios;
    });
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

}

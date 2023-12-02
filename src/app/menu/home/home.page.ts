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
  dataAtual: string;


  constructor(
    private authService: AuthenticationService,
    private alertCtrl: AlertController,
    public popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private exerciseService: ExerciseService,
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

        this.loadUserExercises(user.uid);
        this.exerciseService.loadCompletedExercises(user.uid, this.dataAtual, this.listExercises);
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

  loadUserExercises(userId: string) {
    this.exerciseService.getExercises(userId).subscribe(exercicios => {
      this.listExercises = exercicios;
      this.exerciseService.markCompletedExercises(userId, this.dataAtual, this.listExercises);
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

  ExerciseRouter(exercise: any) {
    const exerciseId = exercise.exerciseId; // Certifique-se de ter a variável exerciseId corretamente definida
    if (exercise.completed) {
      this.resetExercise(exerciseId);
    } else {
      this.router.navigate(['/exercise', exerciseId]);
    }
  }

  async resetExercise(exerciseId: string) {
    await this.exerciseService.resetExercise(exerciseId, this.listExercises);
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

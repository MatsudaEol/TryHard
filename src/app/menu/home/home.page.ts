import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

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
  loading: HTMLIonLoadingElement;
  exibir: boolean = false;

  constructor(
    private authService: AuthenticationService,
    public popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private exerciseService: ExerciseService,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController
    ) {
    this.userData = {};
  }

  async ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        await this.presentLoading();
        this.userData = await this.userService.getUser(user.uid);
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const today = new Date().getDay();
        this.currentDay = daysOfWeek[today];

        this.loadUserExercises(user.uid);
        this.exerciseService.loadCompletedExercises(user.uid, this.dataAtual(), this.listExercises);
      }
      this.formattedDate = this.formatDate(new Date());
      await this.dismissLoading();
      this.exibir = true
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando...',
      translucent: true,
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  dataAtual(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, por isso o +1
    const year = String(now.getFullYear());

    return `${year}-${month}-${day}`;
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
      this.exerciseService.markCompletedExercises(userId, this.dataAtual(), this.listExercises);
      this.cdr.detectChanges(); // Forçar detecção de mudanças
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

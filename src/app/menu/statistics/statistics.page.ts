import { ExerciseService } from 'src/app/services/exercise.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {
  completionPercentage: number = 0;
  userData: any;
  listExercises: any[] = [];
  userId: string;
  subtitle: string = '';
  isPercentageComplete: boolean = false;
  isChecked: boolean = true;

  constructor(
    private exerciseService: ExerciseService,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private alertCtrl: AlertController,

  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userData = await this.userService.getUser(user.uid);
        this.userId = user.uid;
        this.calculatePercentage();
        this.loadUserExercises(user.uid);
        this.exerciseService.loadCompletedExercises(user.uid, this.dataAtual(), this.listExercises);
      }
    });
  }

  loadUserExercises(userId: string) {
    this.exerciseService.getExercises(userId).subscribe(exercicios => {
      const dataAtual = this.exerciseService.dataAtual(); // Correção para chamar a função dataAtual()

      this.listExercises = exercicios;
      this.exerciseService.markCompletedExercises(userId, dataAtual, this.listExercises);
    });
  }

  dataAtual(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, por isso o +1
    const year = String(now.getFullYear());

    return `${year}-${month}-${day}`;
  }

  async resetExercise(exerciseId: string) {
    await this.exerciseService.resetExercise(exerciseId, this.listExercises);
  }

  calculatePercentage() {
      if (this.userId) {
        this.exerciseService.calculateCompletionPercentage(this.userId).subscribe((percentage: number) => {
          this.completionPercentage = Math.round(percentage); // Arredonda a porcentagem

          // Verifica se a porcentagem é igual a 100 e atualiza a variável isPercentageComplete
          this.isPercentageComplete = this.completionPercentage === 100;

          this.updateSubtitle();
        });
      }
  }

  

  updateSubtitle() {
    if (this.isPercentageComplete) {
      this.subtitle = "Treino Concluido";
    } else {
      this.subtitle = "Treino em Andamento";
    }
  }

  async onCheckboxChange(event: CustomEvent, exerciseId: string) {
    const currentCheckedState = event.detail.checked; // Salva o estado atual do checkbox

    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja reiniciar o exercício?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Não faz nada ou trata como necessário ao cancelar
            event.detail.checked = currentCheckedState; // Mantém o estado atual do checkbox
          },
        },
        {
          text: 'Sim',
          cssClass: 'danger',
          handler: async () => {
            const removed = await this.exerciseService.removeExercise(exerciseId, this.listExercises);
            if (removed) {
              event.detail.checked = false; // Desmarca o checkbox se o exercício for reiniciado com sucesso
            } else {
              // Exercício não encontrado ou erro ao remover
            }
          },
        },
      ],
    });

    await alert.present();
  }


  async completeExercise(exercise: any) {
  if (!this.userId || !exercise) {
    console.error('Dados de usuário ou exercício ausentes.');
    return;
  }

  try {
    const exerciseData = {
      exerciseId: exercise.exerciseId,
      name: exercise.name,
      reps: exercise.reps || '0',
      sets: exercise.sets || '0',
      // Outros detalhes conforme necessário
    };

    await this.exerciseService.completeExercise(this.userId, exerciseData);

    console.log('Treino completo adicionado à coleção completedExercises!');
  } catch (error) {
    console.error('Erro ao adicionar treino completo:', error);
  }
}
}

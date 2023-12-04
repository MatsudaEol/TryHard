import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ExerciseService } from '../services/exercise.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

interface ExerciseDetails {
  exercises: {
    exerciseId: string;
    reps?: string;
    sets?: string;
    // Outros campos, se existirem
  }[];
  // Outros campos, se existirem
}

@Component({
  selector: 'app-repetitive-exercise',
  templateUrl: './repetitive-exercise.page.html',
  styleUrls: ['./repetitive-exercise.page.scss'],
})
export class RepetitiveExercisePage implements OnInit {
  exerciseData: any;
  userId: string | null = null;
  isRunning: boolean = false;
  repetitionCount: number = 0;
  displayTime: string = '00:00'; // Tempo inicial (minutos:segundos)
  timerInterval: any; // Referência para o setInterval
  totalElapsedSeconds: number = 0; // Tempo total decorrido
  breakInterval: any;
  breakTimerActive: boolean = false;
  originalTimerColor = 'rgba(251, 251, 251, 0.992)';
  breakTimerColor = this.originalTimerColor;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private exerciseService: ExerciseService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    // Este método é chamado quando o componente é inicializado
    this.route.paramMap.subscribe(async (params) => {
      // Obtém o ID do exercício da URL
      const exerciseId = params.get('exerciseId');
      // Obtém o ID do usuário autenticado
      this.userId = await this.authService.getUserId();

      // Verifica se existem valores para exerciseId e userId
      if (exerciseId && this.userId) {
        // Obtém os detalhes do exercício do serviço de exercícios
        this.exerciseService.getExerciseDetails(this.userId, exerciseId).subscribe((exerciseData) => {
          this.exerciseData = exerciseData;
        });
      }
    });
  }

  startTimer() {
    // Verifica se o timer não está em execução
    if (!this.isRunning) {
      this.isRunning = true;
      if (this.totalElapsedSeconds === 0) {
        this.totalElapsedSeconds = 900; //Daniel, PUXAR DO BANCO O TEMPO DO TREINO
      }

      // Inicia o intervalo para atualizar o tempo
      this.timerInterval = setInterval(() => {
        // Decrementa o tempo total decorrido
        if (this.totalElapsedSeconds > 0) {
          this.totalElapsedSeconds--;
          const minutes = Math.floor(this.totalElapsedSeconds / 60);
          const seconds = this.totalElapsedSeconds % 60;

          // Atualiza o tempo exibido
          this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        } else {
          this.stopTimer(); // Quando o tempo chegar a zero, para o timer
        }
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerInterval);
      this.startBreakTimer();
    }
  }

  // Para o timer
  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.displayTime = '00:00';
    this.totalElapsedSeconds = 0; // Reseta o tempo total decorrido quando o timer é parado
  }

  // Adiciona um zero à esquerda para números menores que 10
  padZero(num: number) {
    return num.toString().padStart(2, '0');
  }

  startBreakTimer() {
    if (!this.breakTimerActive) {
      this.breakTimerActive = true;
      const breakDuration = 60;
      this.breakTimerActive = true;
      this.breakTimerColor = 'rgba(99, 202, 99, 0.805' // Tempo de descanso em segundos (1 minuto neste exemplo)
      let remainingBreakTime = breakDuration;

      // Inicia o intervalo para atualizar o tempo de descanso
      this.breakInterval = setInterval(() => {
        if (remainingBreakTime > 0) {
          remainingBreakTime--;
          const minutes = Math.floor(remainingBreakTime / 60);
          const seconds = remainingBreakTime % 60;

          // Atualiza o tempo exibido durante o descanso
          this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        } else {
          this.stopBreakTimer();
        }
      }, 1000);
    }
  }

  // Para o timer de descanso
  stopBreakTimer() {
    this.breakTimerActive = false;
    clearInterval(this.breakInterval);
    this.startTimer();
    this.breakTimerColor = this.originalTimerColor; // Retorna ao timer principal após o descanso
  }


  incrementRepetition() {
    if (this.isRunning) {
      this.repetitionCount++;
    }
  }

  async completeExercise() {
    if (!this.userId || !this.exerciseData) {
      console.error('Dados d  e usuário ou exercício ausentes.');
      return;
    }

    try {
      await this.exerciseService.completeExercise(this.userId, this.exerciseData);

      console.log('Treino completo adicionado à coleção completedExercises!');
    } catch (error) {
      console.error('Erro ao adicionar treino completo:', error);
    }
  }

}

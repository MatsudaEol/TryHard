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
  displayTime: string = '00:30'; // Tempo inicial (minutos:segundos)
  timerInterval: any; // Referência para o setInterval
  totalElapsedSeconds: number = 0; // Tempo total decorrido
  breakInterval: any;
  breakTimerActive: boolean = false;
  originalTimerColor = 'rgba(251, 251, 251, 0.992)';
  breakTimerColor = this.originalTimerColor;
  breakTimeInSeconds: number = 30; // Tempo de descanso em segundos
  breakDisplayTime: string = '00:30'; // Tempo inicial de descanso (minutos:segundos)
  breakTimerInterval: any; // Referência para o setInterval do tempo de descanso

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
          // Adiciona uma propriedade para armazenar o índice da série atual
          exerciseData.currentSerieIndex = 0;
          this.exerciseData = exerciseData;
        });
      }
    });
  }


  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerInterval);
      this.startBreakTimer();
    }
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.displayTime = '00:00';
    this.totalElapsedSeconds = 0; // Reseta o tempo total decorrido quando o timer é parado
  }

  padZero(num: number) {
    return num.toString().padStart(2, '0');
  }

  startBreakTimer() {
    if (!this.breakTimerActive) {
      this.breakTimerActive = true;
      let remainingBreakTime = this.breakTimeInSeconds;

      // Inicia o intervalo para atualizar o tempo de descanso
      this.breakTimerInterval = setInterval(() => {
        if (remainingBreakTime > 0) {
          remainingBreakTime--;
          const minutes = Math.floor(remainingBreakTime / 60);
          const seconds = remainingBreakTime % 60;

          // Atualiza o tempo exibido durante o descanso
          this.breakDisplayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        } else {
          this.stopBreakTimer();
        }
      }, 1000);
    }
  }

  stopBreakTimer() {
    this.breakTimerActive = false;
    clearInterval(this.breakTimerInterval);
    this.breakDisplayTime = `${this.padZero(Math.floor(this.breakTimeInSeconds / 60))}:${this.padZero(this.breakTimeInSeconds % 60)}`;
    this.breakTimerColor = this.originalTimerColor;
  }

  incrementRepetition() {
    if (this.isRunning) {
      this.repetitionCount++;
    }
  }

  async completeExercise() {
    if (!this.userId || !this.exerciseData) {
      console.error('Dados de usuário ou exercício ausentes.');
      return;
    }

    try {
      await this.exerciseService.completeExercise(this.userId, this.exerciseData);

      // Incrementa o índice da série atual
      this.exerciseData.currentSerieIndex = (this.exerciseData.currentSerieIndex || 0) + 1;

      // Verifica se todas as séries foram concluídas
      if (this.exerciseData.currentSerieIndex >= this.exerciseData.exercises.length) {
        console.log('Exercício completo! Avançando para o próximo...');
        // Reinicia o índice da série
        this.exerciseData.currentSerieIndex = 0;
        // Adiciona lógica para avançar para o próximo exercício ou concluir o treino
        // ... (adicione sua lógica aqui)

      } else {
        // Se ainda houver séries restantes, reinicia o timer para a próxima série
        this.stopTimer();
      }

      console.log('Treino completo adicionado à coleção completedExercises!');
    } catch (error) {
      console.error('Erro ao adicionar treino completo:', error);
    }
  }
}

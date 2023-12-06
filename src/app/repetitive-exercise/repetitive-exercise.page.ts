import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ExerciseService } from '../services/exercise.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface ExerciseDetails {
  exercises: {
    exerciseId: string;
    reps?: string;
    sets?: string;
  }[];
}

@Component({
  selector: 'app-repetitive-exercise',
  templateUrl: './repetitive-exercise.page.html',
  styleUrls: ['./repetitive-exercise.page.scss'],
})
export class RepetitiveExercisePage {
  exerciseData: any;
  userId: string | null = null;
  isRunning: boolean = false;
  displayTime: string = '00:30';
  timerInterval: any;
  totalElapsedSeconds: number = 0;
  breakTimerActive: boolean = false;
  originalTimerColor = 'rgba(251, 251, 251, 0.992)';
  breakTimerColor = this.originalTimerColor;
  breakTimeInSeconds: number = 30;
  breakDisplayTime: string = '00:30';
  breakTimerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private exerciseService: ExerciseService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      this.userId = await this.authService.getUserId();

      if (exerciseId && this.userId) {
        this.exerciseService.getExerciseDetails(this.userId, exerciseId).subscribe((exerciseData) => {
          exerciseData.currentSerieIndex = 0;
          this.exerciseData = exerciseData;
        });
      }
    });
  }

  startBreakTimer() {
    if (!this.isRunning && !this.breakTimerActive) {
      this.breakTimerActive = true;
      this.totalElapsedSeconds = this.breakTimeInSeconds;

      this.breakTimerInterval = setInterval(() => {
        if (this.totalElapsedSeconds <= 0) {
          // Reiniciar o cronômetro para 30 segundos quando atingir "00:00"
          this.totalElapsedSeconds = this.breakTimeInSeconds;
        } else {
          this.totalElapsedSeconds--;
          const minutes = Math.floor(this.totalElapsedSeconds / 60);
          const seconds = this.totalElapsedSeconds % 60;
          this.breakDisplayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        }
      }, 1000);
    }
  }



  padZero(num: number) {
    return num.toString().padStart(2, '0');
  }

  async completeExercise() {
    if (!this.userId || !this.exerciseData) {
      console.error('Dados de usuário ou exercício ausentes.');
      return;
    }

    try {
      await this.exerciseService.completeExercise(this.userId, this.exerciseData);

      this.exerciseData.currentSerieIndex = (this.exerciseData.currentSerieIndex || 0) + 1;

      if (this.exerciseData.currentSerieIndex >= this.exerciseData.exercises.length) {
        console.log('Exercício completo! Avançando para o próximo...');
        this.exerciseData.currentSerieIndex = 0;
      }

      console.log('Treino completo adicionado à coleção completedExercises!');
    } catch (error) {
      console.error('Erro ao adicionar treino completo:', error);
    }
  }
}

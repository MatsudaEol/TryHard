import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-timed-exercise',
  templateUrl: './timed-exercise.page.html',
  styleUrls: ['./timed-exercise.page.scss'],
})
export class TimedExercisePage implements OnInit {
  exerciseData: any;
  displayTime: string = '00:00'; // Tempo inicial (minutos:segundos)
  isRunning: boolean = false; // Estado do timer
  timerInterval: any; // Referência para o setInterval
  totalElapsedSeconds: number = 0; // Tempo total decorrido
  breakInterval: any;
  breakTimerActive: boolean = false;
  originalTimerColor = 'rgba(251, 251, 251, 0.992)';
  breakTimerColor = this.originalTimerColor;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.displayTime = '15:00'; //Daniel, PUXAR DO BANCO A CONTAGEM DO TREINO
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      const userId = await this.authService.getUserId();

      if (exerciseId && userId) {
        this.exerciseService.getExerciseDetails(userId, exerciseId).subscribe((exerciseData) => {
          this.exerciseData = exerciseData;
          // Nota: Inserir um serviço de gerenciamento de estado
        });
      }
    });
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      if (this.totalElapsedSeconds === 0) {
        this.totalElapsedSeconds = 900; //Daniel, PUXAR DO BANCO O TEMPO DO TREINO
      }

      this.timerInterval = setInterval(() => {
        if (this.totalElapsedSeconds > 0) {
          this.totalElapsedSeconds--; // Decrementa o tempo total decorrido
          const minutes = Math.floor(this.totalElapsedSeconds / 60);
          const seconds = this.totalElapsedSeconds % 60;

          this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        } else {
          this.stopTimer(); // Quando o tempo chegar a zero, pare o timer
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

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.displayTime = '00:00';
    this.totalElapsedSeconds = 0; // Reseta o tempo total decorrido quando o timer é parado
  }

  padZero(num: number) {
    return num.toString().padStart(2, '0');
  }

  //Temporizador de Descanso

  startBreakTimer() {
    if (!this.breakTimerActive) {
       this.breakTimerActive = true;
       const breakDuration = 60;
       this.breakTimerActive = true;
        this.breakTimerColor = 'rgba(99, 202, 99, 0.805' // Tempo de descanso em segundos (1 minuto neste exemplo)
       let remainingBreakTime = breakDuration;

       this.breakInterval = setInterval(() => {
         if (remainingBreakTime > 0) {
           remainingBreakTime--;
           const minutes = Math.floor(remainingBreakTime / 60);
           const seconds = remainingBreakTime % 60;
           this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
         } else {
           this.stopBreakTimer();
         }
       }, 1000);
    }
   }

   stopBreakTimer() {
    this.breakTimerActive = false;
    clearInterval(this.breakInterval);
    this.startTimer();
    this.breakTimerColor = this.originalTimerColor; // Retorna ao timer principal após o descanso
   }
}

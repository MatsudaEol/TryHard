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

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      const userId = await this.authService.getUserId();

      if (exerciseId && userId) {
        this.exerciseService.getExerciseDetails(userId, exerciseId).subscribe((exerciseData) => {
          this.exerciseData = exerciseData;
          // Nota:  Inserir um serviço de gerenciamento de estado
        });
      }
    });
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      let totalSeconds = 0;

      this.timerInterval = setInterval(() => {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerInterval);
    }
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.displayTime = '00:00'; // Reinicie o tempo quando parar
  }

  padZero(num: number) {
    return num.toString().padStart(2, '0');
  }
}

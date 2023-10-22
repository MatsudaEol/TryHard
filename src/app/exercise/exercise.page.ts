import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../services/exercise.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exerciseData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      const userId = await this.authService.getUserId();

      if (exerciseId && userId) {
        this.exerciseService.getExerciseDetails(userId, exerciseId).subscribe((exerciseData) => {
          //console.log('Detalhes do exercício:', exerciseData);
          this.exerciseData = exerciseData;

          // Nota:  Inserir um serviço de gerenciamento de estado
        });
      }
    });
  }

  startWorkout() {
    if (this.exerciseData && this.exerciseData.type === 'time') {
      this.router.navigate(['/timed-exercise', this.exerciseData.exerciseId]); 
    } else if (this.exerciseData && this.exerciseData.type === 'rep') {
      this.router.navigate(['/repetitive-exercise', this.exerciseData.exerciseId]); 
    }
  }
  
}

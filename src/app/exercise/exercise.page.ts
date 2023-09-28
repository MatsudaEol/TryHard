import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdtempService } from 'src/app/services/bdtemp.service';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise: any;
  exerciseNumber: number = 1; // Inicializado com 1 por padrão

  constructor(private activatedRoute: ActivatedRoute, private bdtempService: BdtempService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const exerciseId = paramMap.get('id');

      // Verifica se exerciseId não é nulo antes de fazer a comparação
      if (exerciseId !== null) {
        // Use o ID para buscar os detalhes do exercício
        this.exercise = this.bdtempService.getExerciseById(exerciseId);

        // Calcula o número do exercício com base na posição na lista
        const exerciseIndex = this.bdtempService.listExercises.findIndex(
          (exercise) => exercise.id === +exerciseId
        );

        if (exerciseIndex !== -1) {
          this.exerciseNumber = exerciseIndex + 1;
        }
      }
    });

  }
  startWorkout() {
    if (this.exercise && this.exercise.type === 'tempo') {
      this.router.navigate(['/timed-exercise', this.exercise.id]);
    } else if (this.exercise && this.exercise.type === 'repetições') {
      this.router.navigate(['/repetitive-exercise', this.exercise.id]);
    }
  }
}
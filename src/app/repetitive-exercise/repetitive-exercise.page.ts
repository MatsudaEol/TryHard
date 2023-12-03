import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ExerciseService } from '../services/exercise.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

// Interface para definir a estrutura dos detalhes do exercício
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

  async completeExercise() {
    if (!this.userId || !this.exerciseData) {
      console.error('Dados de usuário ou exercício ausentes.');
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

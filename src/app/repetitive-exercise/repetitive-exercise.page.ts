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
    // Verifica se há um usuário logado
    if (!this.userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }

    // Obtém a data atual no formato adequado
    const currentDate = new Date().toISOString().split('T')[0];

    try {
      // Busca os detalhes dos exercícios do Firestore
      const exerciseDetails = await this.firestore.collection('userExercises')
        .doc(this.userId).get()
        .pipe(
          // Mapeia os dados retornados para o tipo ExerciseDetails definido
          map((doc) => doc.data() as ExerciseDetails)
        ).toPromise();

      // Verifica se existem detalhes de exercícios e se é um array válido
      if (exerciseDetails && Array.isArray(exerciseDetails.exercises)) {
        // Encontra o exercício específico a ser concluído
        const exerciseToComplete = exerciseDetails.exercises.find((exercise) =>
          exercise.exerciseId === this.exerciseData.exerciseId);

        // Verifica se o exercício foi encontrado
        if (exerciseToComplete) {
          const { reps, sets } = exerciseToComplete;
          // Prepara os dados do exercício concluído
          const completedExerciseData = {
            name: this.exerciseData.name,
            reps: reps || '0', // Usando '0' como padrão se não houver valor definido
            sets: sets || '0', // Usando '0' como padrão se não houver valor definido
            // ... Outros detalhes conforme necessário
          };

          // Salva os dados do exercício concluído na coleção completedExercises
          await this.firestore.collection('completedExercises').doc(this.userId).set({
            [currentDate]: {
              [this.exerciseData.exerciseId]: completedExerciseData,
            },
          }, { merge: true });

          console.log('Treino completo adicionado à coleção completedExercises!');
          console.log(currentDate)
        } else {
          console.error('Detalhes do exercício não encontrados para o usuário.');
        }
      } else {
        console.error('Dados de exercício não encontrados para o usuário ou formato inválido.');
      }
    } catch (error) {
      console.error('Erro ao adicionar treino completo:', error);
    }
  }
}

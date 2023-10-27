import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../services/exercise.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'; // Remova a importação redundante do LoadingController

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exerciseData: any;
  loading: HTMLIonLoadingElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private loadingController: LoadingController // Correção aqui
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      const userId = await this.authService.getUserId();

      if (exerciseId && userId) {
        this.loading = await this.loadingController.create({
          message: 'Carregando...', // Mensagem exibida no spinner
          translucent: true, // Deixa o spinner translúcido
        });

        await this.loading.present();

        this.exerciseService.getExerciseDetails(userId, exerciseId).subscribe((exerciseData) => {
          this.exerciseData = exerciseData;
          this.loading.dismiss(); // Fecha o loading spinner quando os dados forem carregados
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

  goBack() {
    this.navCtrl.back();
  }
}

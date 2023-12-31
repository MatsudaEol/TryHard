import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  showPassword: boolean = false;
  regForm: FormGroup;
  passwordFocused: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    private firestore: AngularFirestore,
    public exerciseService: ExerciseService,
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&.,])[A-Za-z\d$@$!%*?&].{8,}'),
        ],
      ],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  markAsTouched(controlName: string) {
    this.regForm.get(controlName)?.markAsTouched();
  }

  passwordValid(criteria: string): boolean {
    const control = this.regForm.get('password');
    const value = control.value;

    switch (criteria) {
      case 'uppercase':
        return /[A-Z]/.test(value);
      case 'lowercase':
        return /[a-z]/.test(value);
      case 'number':
        return /\d/.test(value);
      case 'specialChar':
        return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
      case 'length':
        return value && value.length >= 8;
      default:
        return false;
    }
  }

  passwordFullyValid(): boolean {
    return (
      this.passwordValid('uppercase') &&
      this.passwordValid('lowercase') &&
      this.passwordValid('number') &&
      this.passwordValid('specialChar') &&
      this.passwordValid('length')
    );
  }

  passwordInvalid(criteria: string): boolean {
    return !this.passwordValid(criteria);
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      try {
        const userCredential = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);
        const user = userCredential.user;

        if (user) {
          const userId = user.uid;
          const username = this.regForm.value.username;
          const email = this.regForm.value.email;
          this.regForm.reset();
          loading.dismiss();

          const userData = {
            username: username,
            email: email

          };

          await this.firestore.collection('users').doc(userId).set(userData);

          // Criar um documento vazio na coleção completedExercises
          const completedExercisesData = {
            username: username
          };
          await this.firestore.collection('completedExercises').doc(userId).set(completedExercisesData);
          
          const now = new Date();
          const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

          const notificationsData = {
            notificationId: this.firestore.createId(),
            notifications: [
              {
                title: "Bem vindo",
                content: "Seja bem vindo a TryHard, sua jornada conosco começa aqui",
                type: "welcome",
                time: formattedTime, // Adicionando a propriedade de hora formatada
              }
            ],
            username: username,
          };

          await this.firestore.collection('userNotifications').doc(userId).set(notificationsData);


          const userExerciseData = {
            exercises: [
              {
                "amount": "15",
                "exerciseId": "jlXPiRwgytiB8B8duM0c"
              },
              {
                "exerciseId": "8FuLl9ozB2AmNPZ45A3s",
                "reps": "12",
                "sets": "3"
              },
              {
                "exerciseId": "8IB5PpB2x2VS4hBkvGnT",
                "reps": "12",
                "sets": "3"
              },
              {
                "exerciseId": "LgY4og4i9gMwbs2ScH4K",
                "reps": "12",
                "sets": "3"
              },
              {
                "exerciseId": "Uf0dRY4bqXjWANjO3FsG",
                "reps": "12",
                "sets": "3"
              },
              {
                "exerciseId": "oPTwyQg9jxbnzIPqLKHZ",
                "reps": "12",
                "sets": "3"
              },
              {
                "exerciseId": "pIxXtoKyAoZ9i46vfHDp",
                "reps": "12",
                "sets": "3"
              }
            ],
            userId: userId,
            username: username
          };

          await this.firestore.collection('userExercises').doc(userId).set(userExerciseData);

          this.exerciseService.getExercises(userId).subscribe((exercicios) => {
            console.log('Dados dos exercícios:', exercicios);
          });

          this.router.navigate(['/first-introduction']);
        } else {
          console.log('Fornecer valores corretos');
          loading.dismiss();
        }
      } catch (error) {
        console.log(error);
        loading.dismiss();
      }
    } else {
      loading.dismiss();
    }
  }
}

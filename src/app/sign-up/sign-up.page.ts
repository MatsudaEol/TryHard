import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  showPassword: boolean = false;
  regForm: FormGroup

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router : Router, private firestore: AngularFirestore ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      email : ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password:['', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&.,])[A-Za-z\d$@$!%*?&].{8,}'),
      ]]

    })
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

    get errorControl(){
      return this.regForm?.controls
    }

    async signUp() {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      if (this.regForm?.valid) {
        try {
          const userCredential = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password);
          const user = userCredential.user;
          if (user) {
            const userData = {
              username: this.regForm.value.username,
              email: this.regForm.value.email,
            };

            await this.firestore.collection('users').doc(user.uid).set(userData);

            loading.dismiss();
            this.router.navigate(['/tabs/home']);
          } else {
            console.log('provide correct value');
            loading.dismiss(); // Oculta o loading no caso de informações incorretas
          }
        } catch (error) {
          console.log(error);
          loading.dismiss(); // Oculta o loading no caso de erro no registro
        }
      } else {
        loading.dismiss(); // Oculta o loading se o formulário não for válido
      }
    }
    
  
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  showPassword: boolean = false;
  loginForm: FormGroup

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AuthenticationService, public router : Router ) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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

  get errorControl(){
    return this.loginForm?.controls
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      try {
        const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        if (user) {
          loading.dismiss();
          this.router.navigate(['/tabs/home']);
        } else {
          console.log('provide correct value');
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
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
 
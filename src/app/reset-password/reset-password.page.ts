import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = '';
  success: boolean = false;
  selectedOption: string = 'email';
  failed: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  async resetarSenha(email: string) {
    const result = await this.authService.resetPassword(email);
    if (result.success) {
      this.success = true;
      this.failed = false;
      console.log(result.message);
      setTimeout(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        window.location.reload();
      }, 5000);

    } else {
      console.error(result.message, result.error);
      this.failed = true;
    }
  }

  resetSuccess() {
    this.success = false;
  }

}

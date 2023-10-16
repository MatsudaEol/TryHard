import { Component, OnInit } from '@angular/core';
import { BdtempService } from 'src/app/services/bdtemp.service';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listExercises: any[] = [];
  userName: string; 

  constructor(
    private authService: AuthenticationService,
    private bdtempService: BdtempService,
    public popoverController: PopoverController,
    private afAuth: AngularFireAuth, 
    private userService: UserService, 
    private router: Router
  ) {
    this.userName = 'Visitante';
  }

  async ngOnInit() {
    this.listExercises = this.bdtempService.listExercises;

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userName = await this.userService.getUserName(user.uid);
      }
    });
  }

  async closePopover() {
    await this.popoverController.dismiss();
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    }).catch(error => {
      console.log('Erro ao fazer logout:', error);
    });
  }
}

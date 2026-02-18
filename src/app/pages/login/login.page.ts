import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, IonInput ]
})
export class LoginPage implements OnInit {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   entrar() {
    if (this.authService.login(this.email, this.senha)) {
      this.router.navigate(['/listas']);
    }
  }

}

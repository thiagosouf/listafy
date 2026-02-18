import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, senha: string) {
    if (email && senha) {
      localStorage.setItem('user', email);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLogged() {
    return !!localStorage.getItem('user');
  }
}

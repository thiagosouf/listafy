import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'listas',
    loadComponent: () => import('./pages/listas/listas.page').then( m => m.ListasPage)
  },
  {
    path: 'lista/:id',
    loadComponent: () => import('./pages/lista-detalhe/lista-detalhe.page').then( m => m.ListaDetalhePage)

  }
];

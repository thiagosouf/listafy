import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Lista} from '../../models/lista';
import { ListaService } from 'src/app/services/lista';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline, trendingUpOutline } from 'ionicons/icons';

import { IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton } from '@ionic/angular/standalone';

addIcons({
  trendingUpOutline,
  arrowBackOutline,
  checkmarkCircleOutline
});

@Component({
  selector: 'app-lista-detalhe',
  templateUrl: './lista-detalhe.page.html',
  styleUrls: ['./lista-detalhe.page.scss'],
  standalone: true,
  imports: [IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton]
})

export class ListaDetalhePage implements OnInit {

  lista!: Lista;

  aba = 'itens';

  comparacoes = [
    { nome: 'Item 1', peso:1, preco: 15 },
    { nome: 'Item 2', peso:0.9, preco: 14 },
  ].map(item => ({ ...item, precoPorKg: item.preco / item.peso }));

  constructor(
    private listaService: ListaService,
    private router: Router
  ) {


   }

  ngOnInit() {
    const id = this.router.url.split('/').pop();
    const listaEncontrada = this.listaService.getListas().find(l => l.id === id);
    if (listaEncontrada) {
      this.lista = listaEncontrada;
      console.log(this.lista);
      
    } else {
      this.router.navigate(['/listas']);
    }
  }

  mostrarItens(){
    this.aba = 'itens';
  }

  mostrarCusto(){
    this.aba = 'custo';
  }

  


}

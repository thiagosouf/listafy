import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Lista} from '../../models/lista';
import { ListaService } from 'src/app/services/lista';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline, trendingUpOutline } from 'ionicons/icons';

import { IonContent, IonBackButton, IonLabel, IonButtons, IonInput, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { Item } from 'src/app/models/item';

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
  imports: [IonContent, IonBackButton, IonLabel,IonButtons, IonInput, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton, IonCheckbox]
})

export class ListaDetalhePage implements OnInit {

  lista!: Lista;
  item1: Item = {
  nome: '',
  quantidade: 0,
  preco: 0
};

  item2: Item = {
  nome: '',
  quantidade: 0,
  preco: 0
};
  comparado: boolean | undefined;

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

  compararCustoBeneficio() {
    console.log(this.item1, this.item2);
    
    if (this.item1.nome && this.item2.nome) {
      this.comparado = true;
      this.comparacoes = [
        { nome: this.item1.nome, peso: this.item1.quantidade, preco: this.item1.preco },
        { nome: this.item2.nome, peso: this.item2.quantidade, preco: this.item2.preco },
      ].map(item => ({ ...item, precoPorKg: item.preco / item.peso }));
      //quero que retorne somente o item com o menor precoPorKg
      this.comparacoes = this.comparacoes.sort((a, b) => a.precoPorKg - b.precoPorKg);
      console.log(this.comparacoes[0]);
      
    } else {
      alert('Preencha os dados dos itens para comparar.');
    }
  }

  


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Lista} from '../../models/lista';
import { ListaService } from 'src/app/services/lista';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline, trendingUpOutline } from 'ionicons/icons';

import { IonContent, IonBackButton, IonLabel, IonButtons, IonInput, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton, IonCheckbox, IonModal } from '@ionic/angular/standalone';
import { Item } from 'src/app/models/item';
import { OverlayEventDetail } from '@ionic/core/components';

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
  imports: [IonModal, IonContent, IonBackButton, IonLabel,IonButtons, IonInput, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton, IonItem, IonIcon, IonNote, IonButton, IonCheckbox]
})

export class ListaDetalhePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
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

  addItens(){
    //o usuario deve inserir o nome, quantidade e preço do item, e depois clicar em "Adicionar Item" para adicionar o item à lista
    if (this.item1.nome && this.item1.quantidade > 0 && this.item1.preco > 0) {
      this.lista.itens.push(this.item1);
      this.item1 = { nome: '', quantidade: 0, preco: 0 };
    } else {
      alert('Preencha os dados do item para adicionar.');
    }
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  qt!: number;
  pr!: number;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.adicionarItem(this.name, this.qt, this.pr);
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  //crie a função adicionarItem() que recebe o nome, quantidade e preço do item, e adiciona o item à lista atual no storage. Em lista.itens adicionado pelo setListas() do ListaService, o item deve ser adicionado à lista de itens da lista atual, e depois a lista deve ser salva novamente no storage. A função deve ser chamada no método confirm() do modal, passando os valores de nome, quantidade e preço do item.
  adicionarItem(nome: string, quantidade: number, preco: number) {
    const novaLista: Lista = {
      id: this.lista.id,
      nome: this.lista.nome,
      itens: [...this.lista.itens, { nome, quantidade, preco }]
    };
    this.listaService.setListas(
      this.listaService.getListas().map(l => l.id === this.lista.id ? novaLista : l)
    );
    this.lista = novaLista;
  }



}

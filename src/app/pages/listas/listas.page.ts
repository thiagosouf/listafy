import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ListaService } from '../../services/lista';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonFab, IonFabButton, IonIcon]
})
export class ListasPage implements OnInit {

  listas: Lista[] = [
    { id: '1', nome: 'Lista 1', itens: [
        { id: '1', nome: 'Item 1', quantidade: 2, preco: 10 },
        { id: '2', nome: 'Item 2', quantidade: 1, preco: 20 },
    ] },
    { id: '2', nome: 'Lista 2', itens: [] },
  ];
  //quero adicionar a variavel listas no local storage para que ela seja persistida mesmo que o usuário feche o aplicativo
  salvarListas() {
    this.listaService.setListas(this.listas);
    console.log(this.listas);
    
  }



  constructor(
    private listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

    ionViewWillEnter() {
    const listasSalvas = this.listaService.getListas();

      if (listasSalvas.length > 0) {
    this.listas = listasSalvas;
  }
  }

  abrir(lista: Lista) {
    this.router.navigate(['/lista', lista.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ListaService } from '../../services/lista';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

addIcons({
  add
});

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonFab, IonFabButton, IonIcon]
})
export class ListasPage implements OnInit {
  listas: Lista[] = [];
  salvarListas() {
    this.listaService.setListas(this.listas);
    console.log(this.listas);
  }
  constructor(
    private listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit() {
    const listasSalvas = this.listaService.getListas();
    console.log(listasSalvas);
    
  }

    ionViewWillEnter() {
    const listasSalvas = this.listaService.getListas();

      if (listasSalvas.length > 0) {
    this.listas = listasSalvas;
  }
  }

  goLogin() {
    this.router.navigate(['']);
  }

  abrir(lista: Lista) {
    this.router.navigate(['/lista', lista.id]);
  }

//crie a função addLista() para adicionar uma nova lista, a função deve chamar um modal com um formulário para o usuário preencher o nome da lista, ao salvar o modal deve adicionar a nova lista à lista de listas e fechar o modal.
  addLista() {
    const nome = prompt('Digite o nome da nova lista:');
    if (nome) {
      const novaLista: Lista = {
        id: Date.now().toString(),
        nome,
        itens: []
      };
      this.listas.push(novaLista);
      this.salvarListas();
    }
  }
}

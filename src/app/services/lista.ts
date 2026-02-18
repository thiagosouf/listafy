import { Injectable } from '@angular/core';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private STORAGE = 'listas';

  getListas(): Lista[] {
    return JSON.parse(localStorage.getItem(this.STORAGE) || '[]');
  }

  setListas(listas: Lista[]) {
    localStorage.setItem(this.STORAGE, JSON.stringify(listas));
  }

  salvarLista(lista: Lista) {
    const listas = this.getListas();
    listas.push(lista);
    localStorage.setItem(this.STORAGE, JSON.stringify(listas));
  }

  atualizar(listas: Lista[]) {
    localStorage.setItem(this.STORAGE, JSON.stringify(listas));
  }
}

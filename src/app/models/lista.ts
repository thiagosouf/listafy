import { Item } from './item';

export interface Lista {
  id: string;
  nome: string;
  dataCriacao: Date;
  itens: Item[];
}

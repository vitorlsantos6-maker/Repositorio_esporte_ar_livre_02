import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemCarrinho } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  itens$ = this.itensSubject.asObservable();

  adicionarItem(item: Item) {
    const atual = this.itensSubject.value;
    const index = atual.findIndex(i => i.item.idItem === item.idItem);

    if (index > -1) {
      atual[index].quantidade += 1;
    } else {
      atual.push({ item, quantidade: 1 });
    }
    this.itensSubject.next([...atual]);
  }

  atualizarQuantidade(idItem: number, quantidade: number) {
    let atual = this.itensSubject.value;
    if (quantidade <= 0) {
      atual = atual.filter(i => i.item.idItem !== idItem);
    } else {
      const item = atual.find(i => i.item.idItem === idItem);
      if (item) item.quantidade = quantidade;
    }
    this.itensSubject.next([...atual]);
  }

  removerItem(idItem: number) {
    const atual = this.itensSubject.value.filter(i => i.item.idItem !== idItem);
    this.itensSubject.next([...atual]);
  }

  limpar() {
    this.itensSubject.next([]);
  }

  getTotal(): number {
    return this.itensSubject.value.reduce((total, i) => total + (i.item.preco * i.quantidade), 0);
  }
}
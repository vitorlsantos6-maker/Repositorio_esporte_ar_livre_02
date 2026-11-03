import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CarrinhoService } from '../service/carrinho.service';
import { ApiService } from '../service/api.service';
import { ItemCarrinho, Atendimento, AtendimentoItem } from '../models/models';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.component.html'
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: ItemCarrinho[] = [];
  idPessoaCliente: number = 1;
  enviandoPedido: boolean = false;

  constructor(
    private carrinhoService: CarrinhoService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrinhoService.itens$.subscribe((itens: ItemCarrinho[]) => {
      this.itensCarrinho = itens;
    });
  }

  alterarQuantidade(idItem: number, quantidade: number): void {
    this.carrinhoService.atualizarQuantidade(idItem, quantidade);
  }

  removerItem(idItem: number): void {
    this.carrinhoService.removerItem(idItem);
  }

  get total(): number {
    return this.carrinhoService.getTotal();
  }

  confirmarCompra(): void {
    if (this.itensCarrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    if (!this.idPessoaCliente) {
      alert('Informe o ID do cliente para prosseguir com a compra.');
      return;
    }

    this.enviandoPedido = true;

    const itensPedido: AtendimentoItem[] = this.itensCarrinho.map(c => ({
      idItem: c.item.idItem!,
      quantidade: c.quantidade,
      valorUnitario: c.item.preco
    }));

    const novoPedido: Atendimento = {
      idPessoa: Number(this.idPessoaCliente),
      dataAtendimento: new Date().toISOString(),
      valorTotal: this.total,
      status: 'Aberto',
      itens: itensPedido
    };

    this.apiService.createPedido(novoPedido).subscribe({
      next: (res: Atendimento) => {
        alert('Pedido realizado com sucesso! Número do pedido: #' + (res.idAtendimento || ''));
        this.carrinhoService.limpar();
        this.enviandoPedido = false;
        this.router.navigate(['/catalogo']);
      },
      error: (err: any) => {
        console.error('Erro ao registrar pedido:', err);
        alert('Erro ao finalizar a compra. Verifique a disponibilidade dos produtos no estoque.');
        this.enviandoPedido = false;
      }
    });
  }
}
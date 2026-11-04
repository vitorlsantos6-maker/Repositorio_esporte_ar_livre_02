import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from '../service/carrinho.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: [] // Remove a dependência do arquivo CSS caso ele não exista
})
export class CarrinhoComponent implements OnInit {
  itens: any[] = [];
  submetendo: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    public carrinhoService: CarrinhoService,
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const s = this.carrinhoService as any;
    if (s.itens$) {
      s.itens$.subscribe((itens: any) => {
        this.itens = itens;
      });
    } else if (s.getItens) {
      this.itens = s.getItens();
    }
  }

  atualizarQtd(item: any, novaQtd: number): void {
    const qtdNum = Number(novaQtd);
    const id = item.idItem || item.id;
    const s = this.carrinhoService as any;
    if (qtdNum <= 0) {
      this.remover(id);
    } else {
      if (s.atualizarQuantidade) {
        s.atualizarQuantidade(id, qtdNum);
      }
    }
  }

  remover(idItem: number): void {
    const s = this.carrinhoService as any;
    if (s.removerItem) {
      s.removerItem(idItem);
    } else if (s.remover) {
      s.remover(idItem);
    }
  }

  limpar(): void {
    this.executarLimpeza();
  }

  private executarLimpeza(): void {
    const s = this.carrinhoService as any;
    if (s.limparCarrinho) {
      s.limparCarrinho();
    } else if (s.limpar) {
      s.limpar();
    }
  }

  confirmarPedido(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.itens || this.itens.length === 0) {
      this.mensagemErro = 'O seu carrinho está vazio.';
      return;
    }

    const entradaId = prompt('Por favor, informe o seu ID de Cliente (Pessoa) para finalizar a compra:');
    if (!entradaId) return;

    const payload = {
      idPessoa: Number(entradaId),
      idCliente: Number(entradaId),
      itens: this.itens.map(i => ({
        idItem: i.idItem || i.id,
        quantidade: i.quantidade
      }))
    };

    this.submetendo = true;

    this.http.post('http://localhost:5000/api/pedidos', payload).subscribe({
      next: (res: any) => {
        this.submetendo = false;
        this.mensagemSucesso = `Pedido #${res.idPedido || res.idAtendimento || ''} realizado com sucesso!`;
        this.executarLimpeza();
        setTimeout(() => {
          this.router.navigate(['/catalogo']);
        }, 2500);
      },
      error: (err) => {
        this.submetendo = false;
        this.mensagemErro = err.error?.mensagem || 'Erro ao processar o pedido. Verifique a disponibilidade em estoque.';
      }
    });
  }
}
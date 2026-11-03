import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Atendimento } from '../models/models';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-pedidos.component.html'
})
export class AdminPedidosComponent implements OnInit {
  pedidos: Atendimento[] = [];
  carregando: boolean = true;
  statusOpcoes: string[] = ['Aberto', 'Em processamento', 'Concluido', 'Cancelado'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarTodosPedidos();
  }

  carregarTodosPedidos(): void {
    this.carregando = true;
    this.apiService.getPedidos().subscribe({ // Corrigido para getPedidos()
      next: (dados: Atendimento[]) => {
        this.pedidos = dados;
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar pedidos:', err);
        this.carregando = false;
      }
    });
  }

  alterarStatus(pedido: Atendimento, novoStatus: string): void {
    if (!pedido.idAtendimento) return;

    this.apiService.updateStatusPedido(pedido.idAtendimento, novoStatus).subscribe({
      next: () => {
        pedido.status = novoStatus as any;
        alert(`Status do pedido #${pedido.idAtendimento} atualizado para "${novoStatus}".`);
      },
      error: (err: any) => {
        console.error('Erro ao atualizar status:', err);
        alert('Não foi possível alterar o status do pedido.');
      }
    });
  }
}
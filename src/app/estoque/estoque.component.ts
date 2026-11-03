import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Estoque } from '../models/models';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {
  itensEstoque: Estoque[] = [];
  itensFiltrados: Estoque[] = [];
  filtroNome: string = '';
  carregando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarEstoque();
  }

  carregarEstoque(): void {
    this.carregando = true;
    this.apiService.getEstoque().subscribe({
      next: (dados: Estoque[]) => {
        this.itensEstoque = dados;
        this.itensFiltrados = [...dados];
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar estoque:', err);
        this.carregando = false;
      }
    });
  }

  filtrar(): void {
    const termo = this.filtroNome.toLowerCase().trim();
    this.itensFiltrados = this.itensEstoque.filter(item => 
      item.nomeItem.toLowerCase().includes(termo) || 
      item.categoria.toLowerCase().includes(termo)
    );
  }
}
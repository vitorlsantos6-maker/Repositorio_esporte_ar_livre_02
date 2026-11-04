import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Subindo apenas 1 nível (../) para encontrar os serviços em src/app/service/
import { ApiService } from '../api.service'; 
import { CarrinhoService } from '../carrinho.service'; 

// Subindo 2 níveis (../../) para encontrar os models em src/app/models/
import { Item, Categoria } from '../../models/models';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  itens: Item[] = [];
  itensFiltrados: Item[] = [];
  categorias: Categoria[] = [];

  filtroNome: string = '';
  categoriaSelecionada: number = 0;
  tipoSelecionado: string = '';

  carregando: boolean = true;
  mensagemErro: string = '';

  constructor(
    private apiService: ApiService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.apiService.getItens().subscribe({
      next: (dados: Item[]) => {
        this.itens = dados.filter((item: Item) => item.ativo);
        this.itensFiltrados = [...this.itens];
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar itens:', err);
        this.mensagemErro = 'Não foi possível carregar o catálogo. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });

    this.apiService.getCategorias().subscribe({
      next: (cats: Categoria[]) => this.categorias = cats,
      error: (err: any) => console.error('Erro ao carregar categorias:', err)
    });
  }

  filtrar(): void {
    this.itensFiltrados = this.itens.filter((item: Item) => {
      const matchNome = item.nome.toLowerCase().includes(this.filtroNome.toLowerCase().trim());
      const matchCategoria = this.categoriaSelecionada === 0 || item.idCategoria === Number(this.categoriaSelecionada);
      const matchTipo = !this.tipoSelecionado || item.tipo === this.tipoSelecionado;

      return matchNome && matchCategoria && matchTipo;
    });
  }

  adicionarAoCarrinho(item: Item): void {
    this.carrinhoService.adicionarItem(item);
    alert(`"${item.nome}" foi adicionado ao carrinho com sucesso!`);
  }
}
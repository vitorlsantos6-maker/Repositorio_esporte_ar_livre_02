import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, Pessoa, Atendimento, EntradaProduto, Estoque, Categoria } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api'; // Ajuste conforme porta do launchSettings.json

  constructor(private http: HttpClient) {}

  // --- ITENS (PRODUTOS / SERVIÇOS) ---
  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/itens`);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/itens/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/itens`, item);
  }

  updateItem(id: number, item: Item): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/itens/${id}`, item);
  }

  // --- CLIENTES (PESSOAS) ---
  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseUrl}/pessoas`);
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/pessoas/${id}`);
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseUrl}/pessoas`, pessoa);
  }

  getPedidosCliente(idPessoa: number): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.baseUrl}/pessoas/${idPessoa}/pedidos`);
  }

  // --- PEDIDOS (ATENDIMENTOS) ---
  getPedidos(status?: string): Observable<Atendimento[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Atendimento[]>(`${this.baseUrl}/pedidos`, { params });
  }

  getPedidoById(id: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.baseUrl}/pedidos/${id}`);
  }

  createPedido(pedido: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.baseUrl}/pedidos`, pedido);
  }

  updateStatusPedido(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/pedidos/${id}/status`, { status });
  }

  // --- ESTOQUE E ENTRADAS ---
  getEstoque(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(`${this.baseUrl}/estoque`);
  }

  getEstoqueById(idItem: number): Observable<Estoque> {
    return this.http.get<Estoque>(`${this.baseUrl}/estoque/${idItem}`);
  }

  createEntradaProduto(entrada: EntradaProduto): Observable<EntradaProduto> {
    return this.http.post<EntradaProduto>(`${this.baseUrl}/entradaprodutos`, entrada);
  }

  // --- CATEGORIAS ---
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorium`);
  }
}
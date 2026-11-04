import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, Categoria } from '../models/models'; // Ajuste o caminho dos models se necessário

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Rota relativa para funcionar perfeitamente com o proxy.conf.json
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Catálogo e Categorias
  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/itens`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorium`);
  }

  // Clientes
  createPessoa(dadosPessoa: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pessoas`, dadosPessoa);
  }

  // Pedidos e Atendimentos
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/atendimentos`);
  }

  updateStatusPedido(idAtendimento: number, novoStatus: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atendimentos/${idAtendimento}`, { status: novoStatus });
  }

  // Estoque e Entradas
  getEstoque(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estoque`);
  }

  createEntradaProduto(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entradas`, payload);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Item } from '../models/models';

@Component({
  selector: 'app-entrada-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entrada-produto.component.html'
})
export class EntradaProdutoComponent implements OnInit {
  form!: FormGroup;
  produtos: Item[] = [];
  salvando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idItem: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      unidade: ['UN', Validators.required],
      valorUnitarioEntrada: [0, [Validators.required, Validators.min(0.01)]]
    });

    // Carregar apenas itens do tipo PRODUTO
    this.apiService.getItens().subscribe({
      next: (dados: Item[]) => {
        this.produtos = dados.filter((i: Item) => i.tipo === 'PRODUTO' && i.ativo);
      },
      error: (err: any) => console.error('Erro ao carregar produtos:', err)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const payload = {
      ...this.form.value,
      idItem: Number(this.form.value.idItem),
      dataEntrada: new Date().toISOString()
    };

    this.apiService.createEntradaProduto(payload).subscribe({
      next: () => {
        alert('Entrada de produto registada com sucesso! O estoque foi atualizado.');
        this.form.reset({ quantidade: 1, unidade: 'UN', valorUnitarioEntrada: 0 });
        this.salvando = false;
      },
      error: (err: any) => {
        console.error('Erro ao registrar entrada:', err);
        alert('Falha ao registrar entrada de produto.');
        this.salvando = false;
      }
    });
  }
}
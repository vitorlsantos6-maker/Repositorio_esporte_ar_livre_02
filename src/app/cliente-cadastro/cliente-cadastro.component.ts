import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Corrigido: apenas um '../'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cliente-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-cadastro.component.html'
})
export class ClienteCadastroComponent implements OnInit {
  form!: FormGroup;
  salvando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      sexo: ['M', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', [Validators.required, Validators.maxLength(2)]],
        cep: ['', Validators.required]
      })
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.apiService.createPessoa(this.form.value).subscribe({
      next: () => {
        alert('Cliente cadastrado com sucesso!');
        this.salvando = false;
        this.router.navigate(['/catalogo']);
      },
      error: (err: any) => {
        console.error('Erro ao cadastrar cliente:', err);
        alert('Falha ao cadastrar cliente. Verifique se CPF ou E-mail já foram cadastrados.');
        this.salvando = false;
      }
    });
  }

  limpar(): void {
    this.form.reset({ sexo: 'M' });
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {
  //DELCARAÇÃO DOS ATRIBUtOS DO COMPONENTE
  nome = ''
  cpf = ''
  sexo = ''
  cep = ''
  rualogradouro = ''
  bairro = ''
  cidade = ''
  uf = ''

  //DECLARAÇÃO DE FUNÇÕES
  exibeDados(){
    console.log(this.nome, this.cpf, this.sexo,
    this.rualogradouro, this.bairro, this.cidade, this.uf)
  }

}
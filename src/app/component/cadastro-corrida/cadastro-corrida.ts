import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-corrida',
  standalone: true,
  imports: [FormsModule], // 👈 Importante para o ngModel funcionar
  templateUrl: './cadastro-corrida.html',
  styleUrl: './cadastro-corrida.css'
})
export class CadastroCorridaComponent {

  corrida = {
    descricao: '',
    data: '',
    distancias: {
      d5k: false,
      d10k: false,
      d25k: false
    }
  };

  cadastrarCorrida() {
    console.log('Corrida cadastrada com sucesso:', this.corrida);
    alert('Corrida cadastrada!');
  }
}
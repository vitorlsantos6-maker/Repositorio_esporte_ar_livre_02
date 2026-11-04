import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app/app.html', // <--- Adicionado a pasta /app/ no caminho
  styleUrl: './app/app.css'      // <--- Ajuste aqui também se o CSS estiver em src/app/
})
export class AppComponent {
  title = 'esporte_arlivre';
}
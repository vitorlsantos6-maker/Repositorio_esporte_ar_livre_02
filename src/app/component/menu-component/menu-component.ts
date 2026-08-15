import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 👈 Deve estar importado aqui

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterLink], // 👈 E adicionado no array de imports!
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent { }
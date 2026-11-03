import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent {}
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';

// ❌ Antes: CadastrarCorridaComponent
// ✅ Agora (com "o"): CadastroCorridaComponent
import { CadastroCorridaComponent } from './component/cadastro-corrida/cadastro-corrida'; 

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "cadastroAtleta",
    component: AtletaComponent,
  },
  {
    path: "cadastrar-corrida",
    component: CadastroCorridaComponent // 👈 Ajuste aqui também!
  }
];
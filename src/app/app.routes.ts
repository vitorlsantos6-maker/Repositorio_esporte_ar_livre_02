import { Routes } from '@angular/router';

import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/home",
        pathMatch:"full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path:"cadastroAtleta",
        component: AtletaComponent,
    }

];

import 'zone.js'; // Adicionado para resolver o erro NG0908
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app.component'; // Mantido o caminho correto para o seu app.component.ts

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
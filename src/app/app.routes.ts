import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/main/categorias/component/categorias.component';
import { LoginComponent } from './components/main/auth/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categorie' },
  { path: 'categorie', component: CategoriasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/create', component: LoginComponent },
];

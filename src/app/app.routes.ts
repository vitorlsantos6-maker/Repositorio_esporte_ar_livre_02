import { Routes } from '@angular/router';
import { CatalogoComponent } from './service/catalogo/catalogo.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { EntradaProdutoComponent } from './entrada-produto/entrada-produto.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { AdminPedidosComponent } from './admin-pedidos/admin-pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro-cliente', component: ClienteCadastroComponent },
  { path: 'admin/entrada-produto', component: EntradaProdutoComponent },
  { path: 'admin/estoque', component: EstoqueComponent },
  { path: 'admin/pedidos', component: AdminPedidosComponent },
  { path: '**', redirectTo: 'catalogo' }
];
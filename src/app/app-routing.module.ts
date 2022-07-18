import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoComponent } from './grafico/grafico.component';
import { PizzaComponent } from './pizza/pizza.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

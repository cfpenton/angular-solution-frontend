import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { GraficoComponent } from './grafico/grafico.component';
import { PizzaComponent } from './pizza/pizza.component';

@NgModule({
  declarations: [
    AppComponent,
    RelatorioComponent,
    GraficoComponent,
    PizzaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDualListBoxModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './template/barra-navegacion/barra-navegacion.component';
import { ErrorComponent } from './template/error/error.component';
import { InicioComponent } from './template/inicio/inicio.component';
import { PiePaginaComponent } from './template/pie-pagina/pie-pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    ErrorComponent,
    InicioComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

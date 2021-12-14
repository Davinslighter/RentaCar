import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelIdentificar } from 'src/app/models/identificar.model';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  seInicioSesion: boolean = false;

  subs: Subscription = new Subscription();

  constructor(private seguridad: SeguridadService) { }

  ngOnInit(): void {
    this.subs = this.seguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModelIdentificar) => {
      this.seInicioSesion = datos.identificado!;
    })
  }

}

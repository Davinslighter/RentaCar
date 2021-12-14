import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private seguridad: SeguridadService,
             private router: Router) { }

  ngOnInit(): void {
    this.seguridad.EliminarInformacionSesion();
    this.router.navigate(['/inicio'])
  }

}

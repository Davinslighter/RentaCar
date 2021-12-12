import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { ModelIdentificar } from '../models/identificar.model';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000';
  datosUsuarioSesion = new BehaviorSubject<ModelIdentificar>(new ModelIdentificar());

  constructor(private http: HttpClient) {
    this.VerificarSesionActual();
  }

  AlmacenarSesion(datos: ModelIdentificar) {
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem('datosSesion',stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  EliminarInformacionSesion() {
    localStorage.removeItem('datosSesion');
    this.RefrescarDatosSesion(new ModelIdentificar());
  }

  Identificar(usuario: string, clave: string): Observable<ModelIdentificar> {
    return this.http.post<ModelIdentificar>(`${this.url}/login`, {
      email: usuario,
      password: clave
    }, {
      headers: new HttpHeaders({
      })
    })
  }

  ObtenerDatosUsuarioSesion() {
    return this.datosUsuarioSesion.asObservable();
  }

  ObtenerInformacionSesion() {
    let datosString = localStorage.getItem('datosSesion');
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return null;
    }
  }

  ObtenerToken() {
    let datosString = localStorage.getItem('datosSesion');
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos.tk;
    } else {
      return '';
    }
  }

  RecuperarClave(usuario: string) {
    return this.http.post<ModelIdentificar>(`${this.url}/clave-olvidada`, {
      usuario: usuario
    }, {
      headers: new HttpHeaders({
      })
    })
  }

  RefrescarDatosSesion(datos: ModelIdentificar) {
    this.datosUsuarioSesion.next(datos);
  }

  SeHaIniciadoSesion() {
    let datosString = localStorage.getItem('datosSesion');
    return datosString;
  }

  VerificarSesionActual() {
    let datos = this.ObtenerInformacionSesion();
    if (datos) {
      this.RefrescarDatosSesion(datos);
    }
  }
}

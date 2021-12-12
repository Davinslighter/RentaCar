import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelVehiculo } from '../models/vehiculo.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  url = 'http://localhost:3000';
  token: string = '';

  constructor(private http: HttpClient, private seguridad: SeguridadService) {
    this.token = this.seguridad.ObtenerToken();
  }

  ObtenerVehiculos(): Observable<ModelVehiculo[]> {
    return this.http.get<ModelVehiculo[]>(`${this.url}/vehiculos`);
  }

  ObtenerVehiculosId(id: string): Observable<ModelVehiculo> {
    return this.http.get<ModelVehiculo>(`${this.url}/vehiculos/${id}`);
  }

  CrearVehiculo(vehiculo: ModelVehiculo): Observable<ModelVehiculo> {
    return this.http.post<ModelVehiculo>(`${this.url}/vehiculos`, vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarVehiculo(vehiculo: ModelVehiculo): Observable<ModelVehiculo> {
    return this.http.put<ModelVehiculo>(`${this.url}/vehiculos/${vehiculo.id}`, vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarVehiculo(id: string): Observable<any> {
    return this.http.delete(`${this.url}/vehiculos/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

}

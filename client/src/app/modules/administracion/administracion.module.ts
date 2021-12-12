import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';


@NgModule({
  declarations: [
    BuscarVehiculoComponent,
    EditarVehiculoComponent,
    EliminarVehiculoComponent,
    CrearVehiculoComponent,
    BuscarUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }

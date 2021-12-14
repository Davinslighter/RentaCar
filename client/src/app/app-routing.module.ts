import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './template/error/error.component';
import { InicioComponent } from './template/inicio/inicio.component';
const routes: Routes = [
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path:'seguridad',
    loadChildren: () => import('./modules/seguridad/seguridad.module').then(x => x.SeguridadModule)
  },
  {
    path:'administracion',
    loadChildren: () => import('./modules/administracion/administracion.module').then((x => x.AdministracionModule))
  },
  {
    path:'solicitudes',
    loadChildren: () => import('./modules/solicitudes/solicitudes.module').then(x => x.SolicitudesModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

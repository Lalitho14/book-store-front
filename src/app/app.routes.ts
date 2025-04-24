import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroFormComponent } from './libro-form/libro-form.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';

export const routes: Routes = [
  {
    //Ruta de acceso principal
    path: '',
    component: HomeComponent,
    title: 'Book Store Home',
  },
  {
    //Ruta de formulario
    path: 'book-store/form/:id',
    component: LibroFormComponent,
    title: 'Edición de Libro',
  },
  {
    //Ruta para mostrar detalles de libro
    path: 'book-store/detalles/:id',
    component: LibroDetalleComponent,
    title: 'Detalle de Libro',
  },
  {
    //Si no existe una ruta ingresada regresa al inicio
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

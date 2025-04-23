import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroFormComponent } from './libro-form/libro-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Book Store Home',
  },
  {
    path: 'book-store/:id',
    component: LibroFormComponent,
    title: 'Edición de Libro',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

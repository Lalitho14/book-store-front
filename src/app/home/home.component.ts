import { Component } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    TagModule,
    CommonModule,
    DataViewModule,
    RatingModule,
    DropdownModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //Inicializar opciones para ordenar elementos
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  //Inicializar opciones para mostrar elementos
  layout: 'grid' | 'list' = 'list';

  //Guarda los libros que recupere
  libros: Libro[] = [];

  //Inicializa los servicios correspondientes
  constructor(private librosService: LibrosService) {}

  //Al iniciar componente
  ngOnInit(): void {
    //Obtiene todos los registros de libros
    this.getAllLibros();

    //Se establecen los valores para ordenar elementos
    this.sortOptions = [
      //Opción para ordenar por año descendentemente
      { label: 'Más nuevo', value: '!anio' },
      //Opción para ordenar por año ascendentemente
      { label: 'Menos nuevo', value: 'anio' },
    ];
  }

  //Obtener todos los registro de libros desde servicio
  getAllLibros() {
    this.librosService.getLibros().subscribe((data) => {
      //Inicializa el arreglo de libros con los datos obtenidos
      this.libros = data;
    });
  }

  //Función para ordenar los elementos
  onSortChange(event: any) {
    //Obtener valor de elemento para ordenar
    let value = event.value;

    if (value.indexOf('!') === 0) {
      //Ordenar descendentemente
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      //Ordena ascendentemente
      this.sortOrder = 1;
      this.sortField = value;
    }

    //Consultar https://v17.primeng.org/dataview#sorting
  }

  //Establece color de etiqueta para mostrar estado de dispoibilidad
  getSeverity(libro: Libro) {
    //Verifica estado de libro
    if (libro.disponible) {
      //Si el libro esta disponible muestra etiqueta en color verde
      return 'success';
    } else {
      //Si el libro no esta disponible muesta etiqueta en color rojo
      return 'danger';
    }
  }
}

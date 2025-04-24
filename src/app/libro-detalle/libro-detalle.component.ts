import { Component } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Libro } from '../models/Libro';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-libro-detalle',
  standalone: true,
  imports: [CardModule, ButtonModule, ToastModule, RouterModule],
  templateUrl: './libro-detalle.component.html',
  styleUrl: './libro-detalle.component.scss',
})
export class LibroDetalleComponent {
  //Modelo de libro a mostrar
  libro?: Libro;

  //Cargar los servicios correspondientes
  constructor(
    private librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  //Al iniciar componente
  ngOnInit() {
    //Recupera parámetro de ID desde URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    //Recupera el libro con su respecivo ID
    this.getBookById(+id!);
  }

  //Recuperar libro desde servicio
  getBookById(id: number) {
    this.librosService.getLibro(id).subscribe({
      next: (libroEncontrado) => {
        //Si se realiza la petición correctamente guardamos los datos
        //en el modelo del libro
        this.libro = libroEncontrado;
      },
      error: (e) => {
        //De existir un error en la petición
        //muestra mensaje de error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.error.message,
        });

        //Vuelve a la página de inicio
        this.router.navigateByUrl('/');
      },
    });
  }
}

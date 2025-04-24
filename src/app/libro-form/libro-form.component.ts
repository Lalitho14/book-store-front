import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { LibrosService } from '../services/libros.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    InputSwitchModule,
    CalendarModule,
  ],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.scss',
})
export class LibroFormComponent {
  formBook!: FormGroup; //Formulario para registrar o actualizar libro
  isSaveInProgress: boolean = false; //Verifica si hay una carga en progreso
  edit: boolean = false; //Verifica si el formulario se mostrará para crear o editar

  //Importar servicios correspondientes
  constructor(
    private fb: FormBuilder,
    private librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    //Inicializar formulario reactivo
    this.formBook = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: ['1999', Validators.required],
      genero: ['', Validators.required],
      disponible: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    //Recupera el parametro ID de url
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    //Si el parametro en diferente a la palabra new
    //el formulario estará en modo de edicón
    if (id !== 'new') {
      //Habilita el modo de edición
      this.edit = true;
      //Recupera en libro por su ID
      this.getBookById(+id!);
    }
  }

  //Recuperar libro por ID desde sevicio
  getBookById(id: number) {
    //Llamada a servicio para recuperar libro
    this.librosService.getLibro(id).subscribe({
      next: (libroEncontrado) => {
        //Si encontro un libro mostrará sus datos
        //en el formulario
        this.formBook.patchValue(libroEncontrado);
      },
      error: () => {
        //De existir un error muestra un mensaje de error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado',
        });

        //Regresa a la página de inicio
        this.router.navigateByUrl('/');
      },
    });
  }

  //Crear nuevo registro de libro con servicio
  createLibro() {
    //Verfica que los campos esten debidamente llenos
    if (this.formBook.invalid) {
      //De faltar campos muestra un mensaje de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente de nuevo.',
      });

      return;
    }

    //Entra en estado de guardado
    this.isSaveInProgress = true;

    //Crear nuevo registro de libro con servicio
    this.librosService.createLibro(this.formBook.value).subscribe({
      next: () => {
        //Si se llevo a cabo con éxito la petición muestra mensaje de
        //confirmación
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro guardado correctamente.',
        });

        //Estado de guardado desactivado
        this.isSaveInProgress = false;
        //Regresa a la página inical
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        //Estado de guardado desactivado
        this.isSaveInProgress = false;
        //Muestra mensaje de error si la petición fallo
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.error.message,
        });
      },
    });
  }

  updateLibro() {
    //Recupera parametro ID desde url
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    //Verifica que los campos del formulario esten correctos
    if (this.formBook.invalid) {
      //Muestra mensaje de error si hay campos inválidos
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente de nuevo.',
      });

      return;
    }

    //Cambia el estado de guardado
    this.isSaveInProgress = true;

    //Actualiza registro de libro con servicio
    this.librosService
      .updateLibro(this.formBook.value, parseInt(id!))
      .subscribe({
        next: () => {
          //Si la petición fue correcta muestra mensaje de confirmación
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Libro actualizado correctamente.',
          });

          //Cambia estado de guardado
          this.isSaveInProgress = false;

          //Vuelve a la página de inicio
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          //Cambia estado de guardado
          this.isSaveInProgress = false;

          //Muestra mensaje de error si la petición fue rechazada
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.error.message,
          });
        },
      });
  }

  removeLibro() {
    //Recupera parametro ID desde url
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    //Cambia estado de guardado
    this.isSaveInProgress = true;

    //Elimina registro de libro desde servicio
    this.librosService.deleteLibro(parseInt(id!)).subscribe({
      next: () => {
        //Muestra mensaje de confirmación
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminando',
          detail: 'Libro eliminando correctamente.',
        });

        //Cambia estado de guardado
        this.isSaveInProgress = false;

        //Regresa a la página de inicio
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        //Cambia estado de guardado
        this.isSaveInProgress = false;

        //Muestra mensaje de error si la petición fue rechazadas
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.error.message,
        });
      },
    });
  }
}

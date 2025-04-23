import { Component } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) {}

  ngOnInit(): void {
    this.getAllLibros();
  }

  getAllLibros() {
    this.librosService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }
}

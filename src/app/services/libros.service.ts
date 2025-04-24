import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private url = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url);
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.url}/${id}`);
  }

  createLibro(book: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.url, book);
  }

  updateLibro(book: Libro, id: number) {
    return this.http.put(`${this.url}/${id}`, book);
  }

  deleteLibro(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

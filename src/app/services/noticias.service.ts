import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerNoticias(): Observable<Noticia[]> {

    return this.http.get<Noticia[]>(
      '/data/noticias.json'
    );

  }

  obtenerNoticiaPorId(
    id: number
  ): Observable<Noticia | undefined> {

    return this.obtenerNoticias().pipe(

      map(
        noticias =>
          noticias.find(
            noticia => noticia.id === id
          )
      )

    );

  }

}
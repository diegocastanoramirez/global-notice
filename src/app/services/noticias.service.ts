/* Importación del decorador Injectable para crear servicios en Angular */
import { Injectable } from '@angular/core';

/* Importación del cliente HTTP para realizar solicitudes a archivos o servicios */
import { HttpClient } from '@angular/common/http';

/* Importación de Observable y operador map de RxJS */
import {
  Observable,
  map
} from 'rxjs';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../models/noticia';

/* Configuración del servicio para que esté disponible globalmente */
@Injectable({
  providedIn: 'root'
})

/* Servicio encargado de gestionar la obtención de noticias */
export class NoticiasService {

  /* Inyección del cliente HTTP */
  constructor(
    private http: HttpClient
  ) {}

  /* Obtiene todas las noticias disponibles */
  obtenerNoticias(): Observable<Noticia[]> {

    return this.http
      .get<Noticia[]>(
        '/data/noticias.json'
      )
      .pipe(

        /* Combina las noticias del archivo JSON con las almacenadas localmente */
        map(
          noticiasJson => {

            /* Recupera las noticias creadas desde el módulo administrativo */
            const noticiasLocalStorage =
              JSON.parse(
                localStorage.getItem(
                  'noticias-admin'
                ) || '[]'
              );

            /* Retorna un único arreglo con todas las noticias */
            return [
              ...noticiasJson,
              ...noticiasLocalStorage
            ];

          }
        )

      );

  }

  /* Obtiene una noticia específica a partir de su identificador */
  obtenerNoticiaPorId(
    id: number
  ): Observable<Noticia | undefined> {

    return this.obtenerNoticias().pipe(

      /* Busca la noticia cuyo id coincida con el valor recibido */
      map(
        noticias =>
          noticias.find(
            noticia =>
              noticia.id === id
          )
      )

    );

  }

}
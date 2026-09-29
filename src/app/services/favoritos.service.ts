/* Importación del decorador Injectable de Angular */
import { Injectable } from '@angular/core';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../models/noticia';

/* Configuración del servicio para disponibilidad global */
@Injectable({
  providedIn: 'root'
})

/* Servicio encargado de gestionar las noticias favoritas */
export class FavoritosService {

  /* Clave utilizada para almacenar favoritos en localStorage */
  private readonly STORAGE_KEY = 'favoritos';

  /* Obtiene todas las noticias favoritas almacenadas */
  obtenerFavoritos(): Noticia[] {

    /* Recupera la información almacenada en localStorage */
    const favoritos = localStorage.getItem(this.STORAGE_KEY);

    /* Convierte los datos almacenados a objetos o retorna un arreglo vacío */
    return favoritos ? JSON.parse(favoritos) : [];
  }

  /* Agrega una noticia a la lista de favoritos */
  agregarFavorito(noticia: Noticia): void {

    /* Obtiene la lista actual de favoritos */
    const favoritos = this.obtenerFavoritos();

    /* Verifica si la noticia ya existe en favoritos */
    const existe = favoritos.find(
      f => f.id === noticia.id
    );

    /* Agrega la noticia únicamente si no existe previamente */
    if (!existe) {

      favoritos.push(noticia);

      /* Guarda la lista actualizada en localStorage */
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(favoritos)
      );
    }
  }

  /* Elimina una noticia de favoritos utilizando su identificador */
  eliminarFavorito(id: number): void {

    /* Filtra la noticia seleccionada y conserva las demás */
    const favoritos = this.obtenerFavoritos()
      .filter(f => f.id !== id);

    /* Actualiza la información almacenada */
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(favoritos)
    );
  }

  /* Verifica si una noticia se encuentra en favoritos */
  esFavorito(id: number): boolean {

    /* Retorna verdadero si la noticia existe en la lista */
    return this.obtenerFavoritos()
      .some(f => f.id === id);
  }

}
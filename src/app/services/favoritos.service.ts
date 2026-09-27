import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private readonly STORAGE_KEY = 'favoritos';

  obtenerFavoritos(): Noticia[] {

    const favoritos = localStorage.getItem(this.STORAGE_KEY);

    return favoritos ? JSON.parse(favoritos) : [];
  }

  agregarFavorito(noticia: Noticia): void {

    const favoritos = this.obtenerFavoritos();

    const existe = favoritos.find(
      f => f.id === noticia.id
    );

    if (!existe) {

      favoritos.push(noticia);

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(favoritos)
      );
    }
  }

  eliminarFavorito(id: number): void {

    const favoritos = this.obtenerFavoritos()
      .filter(f => f.id !== id);

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(favoritos)
    );
  }

  esFavorito(id: number): boolean {

    return this.obtenerFavoritos()
      .some(f => f.id === id);
  }

}
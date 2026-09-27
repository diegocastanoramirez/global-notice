import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Noticia } from '../../models/noticia';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-card.component.html',
  styleUrl: './noticia-card.component.css'
})
export class NoticiaCardComponent implements OnInit {

  @Input() noticia!: Noticia;

  esFavorito = false;

  constructor(
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {

    this.esFavorito =
      this.favoritosService.esFavorito(this.noticia.id);
  }

  toggleFavorito(): void {

    if (this.esFavorito) {

      this.favoritosService.eliminarFavorito(
        this.noticia.id
      );

      this.esFavorito = false;

    } else {

      this.favoritosService.agregarFavorito(
        this.noticia
      );

      this.esFavorito = true;
    }
  }

}
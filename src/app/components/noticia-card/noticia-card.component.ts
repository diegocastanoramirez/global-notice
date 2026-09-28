import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Noticia } from '../../models/noticia';
import { FavoritosService } from '../../services/favoritos.service';
import { Router } from '@angular/router';

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
    private favoritosService: FavoritosService,
    private router: Router
    
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


  verDetalle(): void {

    this.router.navigate([
      '/noticias',
      this.noticia.id
    ]);

  }


}
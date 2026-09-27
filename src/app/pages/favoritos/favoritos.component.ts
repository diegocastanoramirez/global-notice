import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

import { FavoritosService } from '../../services/favoritos.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    NoticiaCardComponent
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {

  favoritos: Noticia[] = [];

  constructor(
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {

    this.favoritos =
      this.favoritosService.obtenerFavoritos();

  }

}
/* Importación de decoradores e interfaces de Angular */
import { Component, OnInit } from '@angular/core';

/* Importación de funcionalidades comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación de componentes reutilizables de la aplicación */
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/* Importación del servicio encargado de gestionar favoritos */
import { FavoritosService } from '../../services/favoritos.service';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../../models/noticia';

/* Configuración del componente de favoritos */
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

/* Componente encargado de mostrar las noticias favoritas del usuario */
export class FavoritosComponent implements OnInit {

  /* Lista de noticias marcadas como favoritas */
  favoritos: Noticia[] = [];

  /* Inyección del servicio de favoritos */
  constructor(
    private favoritosService: FavoritosService
  ) {}

  /* Método ejecutado al inicializar el componente */
  ngOnInit(): void {

    /* Obtiene la lista de noticias favoritas almacenadas */
    this.favoritos =
      this.favoritosService.obtenerFavoritos();

  }

}
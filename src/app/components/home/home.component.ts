import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NoticiaCardComponent } from '../noticia-card/noticia-card.component';

import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    NoticiaCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

noticias: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {}

ngOnInit(): void {

  this.noticiasService
    .obtenerNoticias()
    .subscribe({
      next: (data) => {

      console.log('Datos recibidos:', data);

      console.log('Es array:', Array.isArray(data));

      console.log('Length data:', data.length);

      this.noticias = [...data];

      console.log('Length noticias:', this.noticias.length);

    },
      error: (error) => {
        console.error('Error cargando JSON:', error);
      }
    });

}

}


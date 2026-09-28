import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private noticiasService: NoticiasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.noticiasService
      .obtenerNoticias()
      .subscribe({
        next: (data) => {

          this.noticias = data.filter(
            noticia => noticia.destacado
          );

          this.cdr.detectChanges();

        },
        error: (error) => {
          console.error('Error cargando JSON:', error);
        }
      });

  }
}
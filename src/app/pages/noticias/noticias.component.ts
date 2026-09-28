import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    NoticiaCardComponent
  ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];

  noticiasFiltradas: Noticia[] = [];

  categoriaSeleccionada = 'Todas';

  fechaSeleccionada = 'Todas';

  constructor(
    private noticiasService: NoticiasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.noticiasService
      .obtenerNoticias()
      .subscribe({
        next: (data) => {

          this.noticias = data;

          this.noticiasFiltradas = data;

          this.cdr.detectChanges();

        },
        error: (error) => {
          console.error(error);
        }
      });

  }

  filtrar(categoria: string): void {

    this.categoriaSeleccionada = categoria;

    this.aplicarFiltros();

  }

  filtrarFecha(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.fechaSeleccionada = select.value;

    this.aplicarFiltros();

  }

  aplicarFiltros(): void {

    let resultado = this.noticias;

    if (this.categoriaSeleccionada !== 'Todas') {

      resultado = resultado.filter(
        noticia =>
          noticia.categoria === this.categoriaSeleccionada
      );

    }

  if (this.fechaSeleccionada !== 'Todas') {

    resultado = resultado.filter(
      noticia => noticia.fecha.includes(
        '/' + this.fechaSeleccionada + '/2025'
      )
    );

  }

    this.noticiasFiltradas = resultado;

  }

  totalCategoria(categoria: string): number {

    return this.noticias.filter(
      noticia => noticia.categoria === categoria
    ).length;

  }

}
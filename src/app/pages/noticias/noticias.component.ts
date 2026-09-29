/* Importación de decoradores e interfaces necesarias de Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

/* Importación de directivas comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación de componentes reutilizables */
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/* Importación del servicio que gestiona las noticias */
import { NoticiasService } from '../../services/noticias.service';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../../models/noticia';

/* Configuración del componente de listado de noticias */
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

/* Componente encargado de mostrar y filtrar noticias */
export class NoticiasComponent implements OnInit {

  /* Lista completa de noticias */
  noticias: Noticia[] = [];

  /* Lista de noticias después de aplicar filtros */
  noticiasFiltradas: Noticia[] = [];

  /* Categoría seleccionada por el usuario */
  categoriaSeleccionada = 'Todas';

  /* Fecha seleccionada por el usuario */
  fechaSeleccionada = 'Todas';

  /* Inyección de dependencias necesarias */
  constructor(
    private noticiasService: NoticiasService,
    private cdr: ChangeDetectorRef
  ) {}

  /* Método ejecutado al inicializar el componente */
  ngOnInit(): void {

    /* Obtiene las noticias desde el servicio */
    this.noticiasService
      .obtenerNoticias()
      .subscribe({
        next: (data) => {

          /* Almacena todas las noticias obtenidas */
          this.noticias = data;

          /* Inicialmente muestra todas las noticias */
          this.noticiasFiltradas = data;

          /* Fuerza la actualización de la vista */
          this.cdr.detectChanges();

        },
        error: (error) => {

          /* Muestra errores en consola */
          console.error(error);
        }
      });

  }

  /* Filtra las noticias por categoría */
  filtrar(categoria: string): void {

    /* Guarda la categoría seleccionada */
    this.categoriaSeleccionada = categoria;

    /* Aplica los filtros configurados */
    this.aplicarFiltros();

  }

  /* Filtra las noticias por fecha seleccionada */
  filtrarFecha(event: Event): void {

    /* Obtiene el elemento select que generó el evento */
    const select = event.target as HTMLSelectElement;

    /* Guarda el valor seleccionado */
    this.fechaSeleccionada = select.value;

    /* Aplica nuevamente los filtros */
    this.aplicarFiltros();

  }

  /* Aplica los filtros de categoría y fecha */
  aplicarFiltros(): void {

    /* Inicialmente toma todas las noticias */
    let resultado = this.noticias;

    /* Filtra por categoría cuando no es "Todas" */
    if (this.categoriaSeleccionada !== 'Todas') {

      resultado = resultado.filter(
        noticia =>
          noticia.categoria === this.categoriaSeleccionada
      );

    }

    /* Filtra por fecha cuando no es "Todas" */
    if (this.fechaSeleccionada !== 'Todas') {

      resultado = resultado.filter(
        noticia => noticia.fecha.includes(
          '/' + this.fechaSeleccionada + '/2025'
        )
      );

    }

    /* Actualiza la lista filtrada */
    this.noticiasFiltradas = resultado;

  }

  /* Retorna la cantidad de noticias de una categoría específica */
  totalCategoria(categoria: string): number {

    return this.noticias.filter(
      noticia => noticia.categoria === categoria
    ).length;

  }

}
/* Importación de decoradores e interfaces principales de Angular */
import { Component, OnInit } from '@angular/core';

/* Importación de funcionalidades comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación de servicios para obtener parámetros de ruta y navegación */
import { ActivatedRoute, Router } from '@angular/router';

/* Importación para forzar la actualización de la vista */
import { ChangeDetectorRef } from '@angular/core';

/* Importación de componentes reutilizables */
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

/* Importación del servicio de gestión de noticias */
import { NoticiasService } from '../../services/noticias.service';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../../models/noticia';

/* Configuración del componente de detalle de noticia */
@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './detalle-noticia.component.html',
  styleUrl: './detalle-noticia.component.css'
})

/* Componente encargado de mostrar el detalle de una noticia */
export class DetalleNoticiaComponent implements OnInit {

  /* Objeto que almacena la noticia seleccionada */
  noticia?: Noticia;

  /* Lista de noticias relacionadas con la noticia actual */
  noticiasRelacionadas: Noticia[] = [];

  /* Inyección de dependencias necesarias para el componente */
  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /* Método que se ejecuta al inicializar el componente */
  ngOnInit(): void {

    /* Obtiene el identificador enviado por la ruta */
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    /* Consulta la noticia correspondiente al identificador recibido */
    this.noticiasService
      .obtenerNoticiaPorId(id)
      .subscribe(
        noticia => {

          /* Guarda la noticia obtenida */
          this.noticia = noticia;

          /* Si la noticia existe, carga noticias relacionadas */
          if (noticia) {

            this.cargarRelacionadas(
              noticia.categoria,
              noticia.id
            );

          }

          /* Actualiza manualmente la vista */
          this.cdr.detectChanges();

        }
      );
  }

  /* Obtiene noticias de la misma categoría excluyendo la actual */
  cargarRelacionadas(
    categoria: string,
    idActual: number
  ): void {

    this.noticiasService
      .obtenerNoticias()
      .subscribe(
        noticias => {

          /* Filtra noticias de la misma categoría y limita el resultado a tres elementos */
          this.noticiasRelacionadas =
            noticias
              .filter(
                noticia =>
                  noticia.categoria === categoria &&
                  noticia.id !== idActual
              )
              .slice(0, 3);

          /* Actualiza la vista con los nuevos datos */
          this.cdr.detectChanges();

        }
      );

  }

  /* Navega al detalle de la noticia seleccionada */
  abrirNoticia(id: number): void {

    this.router.navigate([
      '/noticias',
      id
    ]);

  }

}
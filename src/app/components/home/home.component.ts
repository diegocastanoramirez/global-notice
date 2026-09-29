/* Importación de los decoradores y utilidades necesarias de Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

/* Importación de funcionalidades comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación de componentes reutilizables de la aplicación */
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NoticiaCardComponent } from '../noticia-card/noticia-card.component';

/* Importación del servicio encargado de obtener las noticias */
import { NoticiasService } from '../../services/noticias.service';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../../models/noticia';

/* Configuración del componente Home */
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

/* Componente encargado de mostrar la página principal */
export class HomeComponent implements OnInit {

  /* Arreglo que almacena las noticias destacadas */
  noticias: Noticia[] = [];

  /* Constructor con inyección de dependencias */
  constructor(
    private noticiasService: NoticiasService,
    private cdr: ChangeDetectorRef
  ) {}

  /* Método que se ejecuta al inicializar el componente */
  ngOnInit(): void {

    /* Obtiene el listado de noticias desde el servicio */
    this.noticiasService
      .obtenerNoticias()
      .subscribe({

        /* Procesa la respuesta exitosa del servicio */
        next: (data) => {

          /* Filtra únicamente las noticias marcadas como destacadas */
          this.noticias = data.filter(
            noticia => noticia.destacado
          );

          /* Fuerza la actualización de la vista */
          this.cdr.detectChanges();

        },

        /* Manejo de errores durante la carga de datos */
        error: (error) => {
          console.error('Error cargando JSON:', error);
        }
      });

  }
}
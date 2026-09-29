/* Importación de decoradores e interfaces principales de Angular */
import { Component, OnInit } from '@angular/core';

/* Importación de funcionalidades comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación para trabajar con formularios basados en plantilla */
import { FormsModule } from '@angular/forms';

/* Importación de componentes reutilizables de la aplicación */
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

/* Importación del modelo de datos Noticia */
import { Noticia } from '../../models/noticia';

/* Importación del servicio de noticias */
import { NoticiasService } from '../../services/noticias.service';

/* Configuración del componente de administración */
@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})

/* Componente encargado de la gestión administrativa de noticias */
export class AdministracionComponent implements OnInit {

  /* Lista de noticias registradas */
  noticias: Noticia[] = [];

  /* Modelo utilizado para crear una nueva noticia */
  nuevaNoticia: Noticia = {
    id: 0,
    categoria: '',
    titulo: '',
    descripcion: '',
    contenido: '',
    autor: '',
    fecha: '',
    imagen: '',
    destacado: false
  };

  /* Método que se ejecuta al inicializar el componente */
  ngOnInit(): void {

    /* Obtiene las noticias almacenadas en localStorage */
    const noticiasGuardadas =
      localStorage.getItem('noticias-admin');

    /* Verifica si existen noticias previamente registradas */
    if (noticiasGuardadas) {

      /* Convierte el JSON almacenado a objetos de tipo Noticia */
      this.noticias = JSON.parse(
        noticiasGuardadas
      );

    }

  }

  /* Crea una nueva noticia y la almacena localmente */
  crearNoticia(): void {

    /* Genera un identificador único basado en la fecha actual */
    this.nuevaNoticia.id =
      Date.now();

    /* Agrega la nueva noticia al listado */
    this.noticias.push({
      ...this.nuevaNoticia
    });

    /* Guarda el listado actualizado en localStorage */
    localStorage.setItem(
      'noticias-admin',
      JSON.stringify(this.noticias)
    );

    /* Reinicia el formulario con valores por defecto */
    this.nuevaNoticia = {
      id: 0,
      categoria: '',
      titulo: '',
      descripcion: '',
      contenido: '',
      autor: '',
      fecha: '',
      imagen: '',
      destacado: false
    };

  }

  /* Elimina una noticia del listado mediante su identificador */
  eliminarNoticia(id: number): void {

    /* Filtra la noticia seleccionada y mantiene las demás */
    this.noticias =
      this.noticias.filter(
        noticia =>
          noticia.id !== id
      );

    /* Actualiza el almacenamiento local con los cambios */
    localStorage.setItem(
      'noticias-admin',
      JSON.stringify(this.noticias)
    );

  }

}
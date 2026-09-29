import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

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
export class AdministracionComponent implements OnInit {

  noticias: Noticia[] = [];

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

  ngOnInit(): void {

    const noticiasGuardadas =
      localStorage.getItem('noticias-admin');

    if (noticiasGuardadas) {

      this.noticias = JSON.parse(
        noticiasGuardadas
      );

    }

  }

  crearNoticia(): void {

    this.nuevaNoticia.id =
      Date.now();

    this.noticias.push({
      ...this.nuevaNoticia
    });

    localStorage.setItem(
      'noticias-admin',
      JSON.stringify(this.noticias)
    );

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

  eliminarNoticia(id: number): void {

    this.noticias =
      this.noticias.filter(
        noticia =>
          noticia.id !== id
      );

    localStorage.setItem(
      'noticias-admin',
      JSON.stringify(this.noticias)
    );

  }

}
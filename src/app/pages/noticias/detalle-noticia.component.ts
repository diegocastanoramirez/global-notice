import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

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
export class DetalleNoticiaComponent implements OnInit {

  noticia?: Noticia;

  noticiasRelacionadas: Noticia[] = [];

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.noticiasService
      .obtenerNoticiaPorId(id)
      .subscribe(
        noticia => {

          this.noticia = noticia;

          if (noticia) {

            this.cargarRelacionadas(
              noticia.categoria,
              noticia.id
            );

          }

          this.cdr.detectChanges();

        }
      );
  }
  cargarRelacionadas(
    categoria: string,
    idActual: number
  ): void {

    this.noticiasService
      .obtenerNoticias()
      .subscribe(
        noticias => {

          this.noticiasRelacionadas =
            noticias
              .filter(
                noticia =>
                  noticia.categoria === categoria &&
                  noticia.id !== idActual
              )
              .slice(0, 3);

          this.cdr.detectChanges();

        }
      );

  }

  abrirNoticia(id: number): void {

    this.router.navigate([
      '/noticias',
      id
    ]);

  }

}
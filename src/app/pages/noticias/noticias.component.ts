import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';
import { ChangeDetectorRef } from '@angular/core';

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
           
          this.cdr.detectChanges();
         
        },
        error: (error) => {
          console.error(error);
        }
      });

  }

}
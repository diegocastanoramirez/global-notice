import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-card.component.html',
  styleUrl: './noticia-card.component.css'
})
export class NoticiaCardComponent {

  @Input() noticia!: Noticia;

}
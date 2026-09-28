export interface Noticia {

  id: number;

  categoria: string;

  titulo: string;

  descripcion: string;

  contenido: string;

  autor: string;

  fecha: string;

  imagen: string;

  destacado: boolean;

  favorito?: boolean;

}
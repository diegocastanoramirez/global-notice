export interface Noticia {

  id: number;

  categoria: string;

  titulo: string;

  descripcion: string;

  fecha: string;

  imagen: string;

  destacado: boolean;

  favorito?: boolean;

}
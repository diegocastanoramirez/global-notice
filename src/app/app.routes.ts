import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleNoticiaComponent } from './pages/noticias/detalle-noticia.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
  path: 'favoritos',
  component: FavoritosComponent
  },
  {
  path: 'noticias',
  component: NoticiasComponent
  },
  {
  path: 'noticias/:id',
  component: DetalleNoticiaComponent
  },
  {
  path: 'administracion',
  component: AdministracionComponent
  }

];
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

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
  }

];
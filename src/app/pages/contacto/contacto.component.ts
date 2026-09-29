/* Importación del decorador Component de Angular */
import { Component } from '@angular/core';

/* Importación de funcionalidades comunes de Angular */
import { CommonModule } from '@angular/common';

/* Importación de componentes reutilizables */
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

/* Importación de herramientas para formularios reactivos */
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

/* Configuración del componente de contacto */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})

/* Componente encargado de gestionar el formulario de contacto */
export class ContactoComponent {

  /* Formulario reactivo utilizado para capturar la información del usuario */
  formulario: FormGroup;

  /* Indica si el formulario fue enviado correctamente */
  enviado = false;

  /* Inyección del constructor de formularios */
  constructor(
    private fb: FormBuilder
  ) {

    /* Inicialización y configuración de validaciones del formulario */
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });

  }

  /* Método ejecutado al enviar el formulario */
  enviar(): void {

    /* Verifica que todos los campos sean válidos */
    if (this.formulario.valid) {

      /* Activa el mensaje de confirmación */
      this.enviado = true;

      /* Limpia los campos del formulario */
      this.formulario.reset();
    }
  }

}
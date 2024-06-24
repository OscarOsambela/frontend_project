// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalComponent, ButtonComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ModalComponent,
    ButtonComponent,
    MatDialogModule,  // Asegúrate de exportar MatDialogModule si usas un módulo compartido
  ],
})
export class SharedModule { }

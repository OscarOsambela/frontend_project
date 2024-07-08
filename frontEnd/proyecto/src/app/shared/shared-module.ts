// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ModalComponent, 
    ButtonComponent, 
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    ButtonComponent,
    ReactiveFormsModule
  ]  
})
export class SharedModule { }

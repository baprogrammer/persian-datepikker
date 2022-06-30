import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersianDatepikkerComponent } from './persian-datepikker.component';



@NgModule({
  declarations: [
    PersianDatepikkerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    CommonModule
  ],
  exports: [
    PersianDatepikkerComponent
  ]
})
export class PersianDatepikkerModule { }

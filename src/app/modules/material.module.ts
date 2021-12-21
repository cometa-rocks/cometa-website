import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
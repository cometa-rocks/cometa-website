import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';




@NgModule({
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MaterialModule {}
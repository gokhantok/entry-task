import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePickerModule } from '../../components/image-picker/image-picker.module';
import { AuthorFormComponent } from './author-form.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [AuthorFormComponent],
  entryComponents: [AuthorFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ImagePickerModule,
  ]
})
export class authorFormModule { }

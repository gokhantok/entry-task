import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePickerModule } from '../../components/image-picker/image-picker.module';
import { RecipeFormComponent } from './recipe-form.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { AuthorNamesPipe } from 'src/app/pipes/author-names-recipe-form/author-names.pipe';
import { AuthorNamesModule } from 'src/app/pipes/author-names/author-names.module';
@NgModule({
  declarations: [RecipeFormComponent,AuthorNamesPipe],
  entryComponents: [RecipeFormComponent],
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
    MatChipsModule,
    MatAutocompleteModule,
    
  ]
})
export class RecipeFormModule { }

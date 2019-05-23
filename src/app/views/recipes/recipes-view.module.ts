import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatDividerModule, MatChipsModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AuthorNamesModule } from '../../pipes/author-names/author-names.module';
import { RecipesViewComponent } from './recipes-view.component';
import { RecipesViewRoutingModule } from './recipes-view-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFilterPipe } from 'src/app/pipes/recipe-filter/recipe-filter.pipe';
import { RecipeSorterPipe } from 'src/app/pipes/recipe-sorter/recipe-sorter.pipe';

@NgModule({
  declarations: [RecipesViewComponent,RecipeFilterPipe,RecipeSorterPipe],
  imports: [
    CommonModule,
    RouterModule,
    RecipesViewRoutingModule,
    AuthorNamesModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
export class RecipesViewModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RecipeFilterPipe } from './recipe-filter.pipe';

@NgModule({
  declarations: [RecipeFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [RecipeFilterPipe]
})
export class AuthorNamesModule { }

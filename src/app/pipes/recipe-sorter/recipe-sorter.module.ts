
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RecipeSorterPipe } from './recipe-sorter.pipe';

@NgModule({
  declarations: [RecipeSorterPipe],
  imports: [
    CommonModule
  ],
  exports: [RecipeSorterPipe]
})
export class AuthorNamesModule { }

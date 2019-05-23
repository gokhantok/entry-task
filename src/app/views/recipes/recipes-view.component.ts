import { Component } from '@angular/core';
import { AppStateModel } from '../../models/helper/app-state.model';
import { select, Store } from '@ngrx/store';
import { $recipeListData } from '../../selectors/recipe-list.selectors';
import { RoutePath } from 'src/app/app-utils';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss']
})
export class RecipesViewComponent {
  tags = new FormControl('');
  orderby = new FormControl('');

  orderbyASC(){
    this.orderby.setValue('asc');
  }

  orderbyDESC(){
    this.orderby.setValue('desc');
  }

  readonly RoutePath = RoutePath;

  readonly recipeListData$ = this.store.pipe(select($recipeListData));

  constructor(private readonly store: Store<AppStateModel>) { 
    
    this.orderby.setValue('asc');
  }
}

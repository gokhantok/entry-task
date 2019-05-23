import { AppStateModel } from '../models/helper/app-state.model';
import { createSelector } from '@ngrx/store';
import { AuthorModel } from '../models/api/author.model';
import { AuthorRowModel } from '../models/helper/author-row.model';
import { $recipeListData } from './recipe-list.selectors';

const $authors = ({authors}: AppStateModel) => authors;

export const $authorsData = createSelector(
  $authors,
  ({data}): AuthorModel[] => data
);

export const $authorRows = createSelector(
  $authorsData,
  $recipeListData,
  (authors, recipes): AuthorRowModel[] => authors
    .map(author => ({
      ...author,
      recipes: recipes.filter(({authorIds}) => authorIds.includes(author.id))
    }))
);

export const $authorIdNameMap = createSelector(
  $authorsData,
  (authors): {[id: string]: string} => authors
    .reduce((acc, {id, name}) => ({...acc, [id]: name}), {})
);

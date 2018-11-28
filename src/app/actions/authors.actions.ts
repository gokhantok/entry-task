import { Action } from '@ngrx/store';
import { AuthorModel } from '../models/api/author.model';

export class GetAuthorsRequestAction implements Action {
  static readonly type = 'GetAuthorsRequest';
  readonly type = GetAuthorsRequestAction.type;
}

export class GetAuthorsSuccessAction implements Action {
  static readonly type = 'GetAuthorsSuccess';
  readonly type = GetAuthorsSuccessAction.type;

  constructor(public readonly authors: AuthorModel[]) { }
}

export type AuthorsActions
  = GetAuthorsRequestAction
  | GetAuthorsSuccessAction;

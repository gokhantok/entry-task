import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GetAuthorsRequestAction, GetAuthorsSuccessAction, PostAuthorRequestAction, PostAuthorSuccessAction } from '../actions/authors.actions';
import { RoutePath, whenNavigated } from '../app-utils';
import { AuthorModel } from '../models/api/author.model';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NotifyOfSuccessAction } from '../actions/notification.actions';

@Injectable()
export class AuthorsEffects {
  @Effect() readonly requireAuthors$ = this.actions$.pipe(
    whenNavigated(({view, id}) => (
      (view === RoutePath.Recipes && id == null) ||
      (view === RoutePath.Authors) ?
        new GetAuthorsRequestAction() :
        null
    ))
  );

  @Effect() readonly getAuthors$ = this.actions$.pipe(
    ofType(GetAuthorsRequestAction.type),
    switchMap(() => this.http.get<AuthorModel[]>('/authors').pipe(
      map(authors => new GetAuthorsSuccessAction(authors))
    ))
  );

  @Effect() readonly postAuthor$ = this.actions$.pipe(
    ofType(PostAuthorRequestAction.type),
    switchMap(({author}: PostAuthorRequestAction) => this.http.post<AuthorModel>('/authors', author).pipe(
      map(response => {
        alert("Author "+response.name+" has just been added!");
        window.location.reload();
        //console.log(response.name);
        return new PostAuthorSuccessAction(response);
      } )
    ))
  );

  constructor(private readonly actions$: Actions,
              private readonly http: HttpClient) { }
}

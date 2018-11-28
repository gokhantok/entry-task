import { Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateModel } from '../../models/helper/app-state.model';
import { $authorIdNameMap } from '../../selectors/authors.selectors';

@Pipe({
  name: 'appAuthorNames',
  pure: false
})
export class AuthorNamesPipe implements PipeTransform {
  private idNameMap: {[id: string]: string};

  constructor(private readonly store: Store<AppStateModel>) {
    this.store.pipe(select($authorIdNameMap))
      .subscribe(idNameMap => {
        this.idNameMap = idNameMap;
      });
  }

  transform(authorIds: string[]): string {
    return authorIds
      .map((id, index) => {
        const prefix = (
          index === 0 ? '' :
          index === authorIds.length - 1 ? ' and ' :
          ', '
        );
        return `${prefix} ${this.idNameMap[id]}`;
      })
      .join('');
  }
}

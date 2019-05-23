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

/*
      function find_in_object(my_object :any, my_criteria: any){
        return my_object.filter(function(obj) {
            return my_criteria.includes(obj['id']) //obj['id'].includes(my_criteria);
        });
      
      }
  
      var my_json = JSON.stringify(this.authorsData$)
      var filtered_json = find_in_object(this.authorsData$, authorIds);
      //console.table(filtered_json)
      var authornames = filtered_json.map((data) => data.name); 
  
      return authornames;
  
  
  
        //dataname2 = data.map((data) => data.name);*/
 
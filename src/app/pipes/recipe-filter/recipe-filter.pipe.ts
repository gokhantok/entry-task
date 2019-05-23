import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'recipeFilterPipe' })
export class RecipeFilterPipe implements PipeTransform {
  transform(recipe: any, searchText: any): any {
    if(searchText == null || searchText=='') return recipe;
    
    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
          return obj['tags'].includes(my_criteria); 
      });
    
    }
    var my_json = JSON.stringify(recipe)
    var filtered_json = find_in_object(JSON.parse(my_json), searchText);
    return filtered_json;


  }
}


import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { PostRecipeRequestAction, PutRecipeRequestAction } from '../../actions/recipe-detail.actions';
import { IngredientModel } from '../../models/api/ingredient.model';
import { RecipeModel } from '../../models/api/recipe.model';
import { AppStateModel } from '../../models/helper/app-state.model';
import { RecipeDialogDataModel } from '../../models/helper/recipe-dialog-data.model';
import { $authorsData } from '../../selectors/authors.selectors';
import { $recipeById } from '../../selectors/recipe-detail.selectors';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

enum RecipeFormKey {
  Title = 'Title',
  Authors = 'Authors',
  Ingredients = 'Ingredients',
  Text = 'Text',
  Image = 'Image',
  Difficulty = 'Difficulty',
  Tags = 'Tags',
}

enum IngredientFormKey {
  Name = 'Name',
  Amount = 'Amount',
  Unit = 'Unit',
}

export interface Fruit {
  name: string;
}

export interface Tag {
  name: string;
}

export interface Level {
  value: number;
  viewValue: string;
}
@Component({
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  authorCtrl = new FormControl();
  tagCtrl = new FormControl();

  tags = [
    'lemon'
  ];

  // I wanted to use authorsData is a json object but it didn't work. 
  //If it worked, It would be used for chipList
  getAuthorName(id) {

    function find_in_object(my_object, my_criteria){
      return my_object.filter(function(obj) {
          return obj['id'].includes(my_criteria);
      });
    }

    var filtered_json = find_in_object(this.authorsData$, id);
    //console.table(filtered_json)
    var authorname = filtered_json.map((data) => data.name); 

    return authorname[0];
  }


  allFruits = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry'
  ];

  readonly levels$ : Level[] = [
    {value: 0, viewValue: 'Level 0'},
    {value: 1, viewValue: 'Level 1'},
    {value: 2, viewValue: 'Level 2'},
    {value: 3, viewValue: 'Level 3'},
    {value: 4, viewValue: 'Level 4'},
    {value: 5, viewValue: 'Level 5'},
    {value: 6, viewValue: 'Level 6'},
    {value: 7, viewValue: 'Level 7'},
    {value: 8, viewValue: 'Level 8'},
    {value: 9, viewValue: 'Level 9'},
    {value: 10, viewValue: 'Level 10'}
  ];

  @ViewChild('authorInput') authorInput: ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef;


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const authors = this.recipeForm.get('Authors') as FormArray;
      authors.push(this.fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.authorCtrl.setValue(null);
  }
  
  initName(tag: string): FormControl {
    return this.fb.control(tag);
  }
  addTag(event: MatChipInputEvent, form:FormGroup): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
     // this.tags.push(value.trim());
 
      const tags = this.recipeForm.get('Tags') as FormArray;
      tags.push(this.fb.control(value.trim()));
      console.log(tags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(i: number): void {
    const control = <FormArray>this.recipeForm.controls['Authors'];
    control.removeAt(i);
  }
  removeTag(i:number): void {

    const control = <FormArray>this.recipeForm.controls['Tags'];
    control.removeAt(i);

  }
  filter(name: string) {
    return this.allFruits.filter(fruit =>
        fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filterTag(name: string) {
    return this.allFruits.filter(fruit =>
        fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tags = this.recipeForm.get('Authors') as FormArray;
    tags.push(this.fb.control(event.option.value.id));
    console.log(tags);
 
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const tags = this.recipeForm.get('Tags') as FormArray;
    tags.push(this.fb.control(event.option.viewValue.trim()));

    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }


  readonly RecipeFormKey = RecipeFormKey;
  readonly IngredientFormKey = IngredientFormKey;
  recipeForm: FormGroup;


  readonly authorsData$ = this.store.pipe(select($authorsData));

  constructor(@Inject(MAT_DIALOG_DATA) public readonly dialogData: RecipeDialogDataModel,
              private readonly dialogRef: MatDialogRef<RecipeFormComponent>,
              private readonly store: Store<AppStateModel>,
              private readonly fb: FormBuilder) {
                  console.log(this.authorsData$)
               }

  async ngOnInit(): Promise<void> {
    const {recipeId} = this.dialogData;
    const recipe = recipeId != null ?
      await this.store
        .pipe(select($recipeById(recipeId)), take(1))
        .toPromise() :
      null;

    this.recipeForm = this.fb.group({
      [RecipeFormKey.Title]: [recipe != null ? recipe.title : '', Validators.required],
      [RecipeFormKey.Authors]: this.fb.array([]), //[recipe != null ? recipe.authorIds : [], Validators.required],
      [RecipeFormKey.Ingredients]: this.fb.array(
        (recipe != null ? recipe.ingredients : [])
          .map(this.createIngredientGroup)
      ),
      [RecipeFormKey.Text]: [recipe != null ? recipe.text : '', Validators.required],
      [RecipeFormKey.Image]: recipe != null ? recipe.imageUrl : '',
      [RecipeFormKey.Difficulty]: [recipe != null ? recipe.difficulty : '', Validators.required],
      //[RecipeFormKey.Tags]: [recipe != null ? recipe.tags : [], Validators.required],
      [RecipeFormKey.Tags]: this.fb.array([]),
     // tags: this.fb.array([]),
    });
  }

  addIngredient(): void {
    (this.recipeForm.get(RecipeFormKey.Ingredients) as FormArray)
      .push(this.createIngredientGroup());
  }

  removeIngredient(index: number): void {
    (this.recipeForm.get(RecipeFormKey.Ingredients) as FormArray)
      .removeAt(index);
  }

  identifyIngredient(index: number): number {
    return index;
  }

  submitRecipe(): void {
    const {value} = this.recipeForm;
    const recipe: RecipeModel = {
      title: value[RecipeFormKey.Title],
      authorIds: value[RecipeFormKey.Authors],
      ingredients: value[RecipeFormKey.Ingredients]
        .map((ingredientValue): IngredientModel => ({
          name: ingredientValue[IngredientFormKey.Name],
          amount: ingredientValue[IngredientFormKey.Amount],
          ...ingredientValue[IngredientFormKey.Amount] && {
            unit: ingredientValue[IngredientFormKey.Amount]
          }
        })),
      text: value[RecipeFormKey.Text],
      imageUrl: value[RecipeFormKey.Image],
      difficulty: value[RecipeFormKey.Difficulty],
      tags: value[RecipeFormKey.Tags]
    };

    const {recipeId} = this.dialogData;
    this.store.dispatch(
      recipeId != null ?
        new PutRecipeRequestAction(recipeId, recipe) :
        new PostRecipeRequestAction(recipe)
    );
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private createIngredientGroup(ingredient?: IngredientModel): FormGroup {
    return this.fb.group({
      [IngredientFormKey.Name]: ingredient != null ? ingredient.name : '',
      [IngredientFormKey.Amount]: ingredient != null ? ingredient.amount : '',
      [IngredientFormKey.Unit]: ingredient != null ? ingredient.unit || '' : '',
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
//import { PostRecipeRequestAction, PutRecipeRequestAction } from '../../actions/recipe-detail.actions';
//import { IngredientModel } from '../../models/api/ingredient.model';
import { AuthorModel } from '../../models/api/author.model';
import { AppStateModel } from '../../models/helper/app-state.model';
//import { RecipeDialogDataModel } from '../../models/helper/recipe-dialog-data.model';
import { $authorsData } from '../../selectors/authors.selectors';
//import { $recipeById } from '../../selectors/recipe-detail.selectors';
import { PutAuthorRequestAction, PutAuthorSuccessAction, PostAuthorRequestAction } from 'src/app/actions/authors.actions';
import { AuthorDialogDataModel } from 'src/app/models/helper/author-dialog-data.model';
import { NotifyOfSuccessAction } from 'src/app/actions/notification.actions';


enum AuthorFormKey {
  name = 'Name',
  email = 'Email',
  skill = 'Skill'
}

export interface Level {
  value: number;
  viewValue: string;
}


@Component({
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  readonly AuthorFormKey = AuthorFormKey;
  authorForm: FormGroup;

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

  constructor(@Inject(MAT_DIALOG_DATA) public readonly dialogData: AuthorDialogDataModel,
              private readonly dialogRef: MatDialogRef<AuthorFormComponent>,
              private readonly store: Store<AppStateModel>,
              private readonly fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    const {authorId} = this.dialogData;
    const author = authorId ;
    /*!= null ?
      await this.store
        .pipe(select($recipeById(authorId)), take(1))
        .toPromise() :
      null;*/

    this.authorForm = this.fb.group({
      [AuthorFormKey.name]: [[''], Validators.required],
      [AuthorFormKey.email]: [[''], Validators.required],
      [AuthorFormKey.skill]: [[''], Validators.required],
    //  [AuthorFormKey.Image]: author != null ? author.imageUrl : '',
    });
  }



  submitAuthor(): void {
    const {value} = this.authorForm;
    const author: AuthorModel = {
      id: '1',
      name: value[AuthorFormKey.name],
      email: value[AuthorFormKey.email],
      avatar: '',
      skill: value[AuthorFormKey.skill]
    };

    const {authorId} = this.dialogData;
    this.store.dispatch(
     /* authorId != null ?
        new PutAuthorRequestAction(authorId, author) :*/
        new PostAuthorRequestAction(author)
    );
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}

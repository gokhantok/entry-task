import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RecipeFormModule } from './modal-views/recipe-form/recipe-form.module';
import { REDUCERS } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { MatSnackBarModule } from '@angular/material';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';
import { AuthorNamesPipe } from './pipes/author-names/author-names.pipe';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
    StoreDevtoolsModule.instrument(),

    MatSnackBarModule,
    ToolbarModule,
    BreadcrumbsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

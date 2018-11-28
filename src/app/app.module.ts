import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { REDUCERS } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

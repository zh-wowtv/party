import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { routes, ROUTES_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';
import { PARTIES_DECLARATIONS } from './parties';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...PARTIES_DECLARATIONS
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    ...ROUTES_PROVIDERS
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {}

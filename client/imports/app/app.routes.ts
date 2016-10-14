import { Route } from '@angular/router';
import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';
import { Meteor } from 'meteor/meteor';
import {LoginComponent} from "./auth/login.component";
import {SignupComponent} from "./auth/singup.component";
import {RecoverComponent} from "./auth/recover.component";
 
export const routes : Route[] = [
	{ path: '', component: PartiesListComponent },
  { path: 'party/:id', component: PartyDetailsComponent, canActivate:['canActivateForLoggedIn']},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];


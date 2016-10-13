import { Route } from '@angular/router';
import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';
import { Meteor } from 'meteor/meteor';

export const routes : Route[] = [
	{ path: '', component: PartiesListComponent },
  { path: 'party/:id', component: PartyDetailsComponent, canActivate:['canActivateForLoggedIn']}
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];


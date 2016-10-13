import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template
})
export class PartiesListComponent {
  parties:Observable<Party[]>;

  constructor() {
    this.parties = Parties.find({}).zone();
  }

  removeParty(party: Party) {
    if ( !Meteor.userId() ) {
			alert("Need to login to remove party.");
      return;
    }
    Parties.remove(party._id);
  }
}
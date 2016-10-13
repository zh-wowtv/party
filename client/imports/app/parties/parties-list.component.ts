import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template
})
export class PartiesListComponent implements OnInit, OnDestroy {
  parties:Observable<Party[]>;
	subscription : Subscription;

  ngOnInit() {
		this.parties = Parties.find({}).zone();
    this.subscription = MeteorObservable.subscribe('parties').subscribe();
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
  }

  removeParty(party: Party) {
    if ( !Meteor.userId() ) {
			alert("Need to login to remove party.");
      return;
    }
    Parties.remove(party._id);
  }

  search(value: string) {    
    this.parties = Parties.find(value ? {location: value} : {}).zone();
  }
}
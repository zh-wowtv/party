import { Component , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import template from './party-details.component.html';
import { Party } from '../../../../both/models/party.model';
import { Parties } from '../../../../both/collections/parties.collection';

@Component({
  selector: 'party-details',
  template
})
export class PartyDetailsComponent implements OnInit, OnDestroy {
  partyId: string;
  party: Party;
  subscription: Subscription
  partySubscription: Subscription

  constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.subscription = this.route.params
    	.map(params => params['id'])
      .subscribe(partyId => {
        this.partyId = partyId;        
        if (this.partySubscription) {
          this.partySubscription.unsubscribe();
        }
        this.partySubscription = MeteorObservable.subscribe('party')
        	.subscribe(() => {
            this.party = Parties.findOne({_id: this.partyId});
          });
      })
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
    this.partySubscription.unsubscribe();
  }

  updateParty() {
    if (!Meteor.userId()) {
			alert("Need login to update party!");
      return;
    }

    Parties.update(this.party._id,{
      $set: {
				name: this.party.name,
        description: this.party.description,
        location: this.party.location
      }
    })
    // TODO: 
    // 1. callback
    // 2. back to previous page
  }
}
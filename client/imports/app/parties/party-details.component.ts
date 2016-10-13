import { Component , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import template from './party-details.component.html';
import { Party } from '../../../../both/models/party.model';
import { Parties } from '../../../../both/collections/parties.collection';

@Component({
  selector: 'party-details',
  template
})
export class PartyDetailsComponent implements OnInit, OnDestroy {
  party: Party;
  subscription: Subscription

  constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.subscription = this.route.params
    	.map(params => params['id'])
      .subscribe(partyId => {
        this.party = Parties.findOne(partyId);
      })
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
  }

  updateParty() {
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
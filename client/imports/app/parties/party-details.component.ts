import { Component , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import template from './party-details.component.html';
import { Party } from '../../../../both/models/party.model';
import { Parties } from '../../../../both/collections/parties.collection';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

@Component({
  selector: 'party-details',
  template
})
export class PartyDetailsComponent implements OnInit, OnDestroy {
  partyId: string;
  party: Party;
  subscription: Subscription
  partySubscription: Subscription
	users: Observable<User>;
  uninvitedSub: Subscription;

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

    if (this.uninvitedSub) {
      this.uninvitedSub.unsubscribe();
    } 

    this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId)
    	.subscribe( () => {
        this.users = Users.find({
          _id: {
            $ne: Meteor.userId()
          }
        }).zone();
      })
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
    this.partySubscription.unsubscribe();
    this.uninvitedSub.unsubscribe();
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
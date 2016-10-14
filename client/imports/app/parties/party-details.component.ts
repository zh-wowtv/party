import { Component , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MouseEvent } from "angular2-google-maps/core";

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
@InjectUser('user')
export class PartyDetailsComponent implements OnInit, OnDestroy {
  partyId: string;
  party: Party;
  subscription: Subscription
  partySubscription: Subscription
	users: Observable<User>;
  uninvitedSub: Subscription;
	user: Meteor.User;
	// Default center Palo Alto coordinates.
  centerLat: number = 37.4292;
  centerLng: number = -122.1381;

  constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.subscription = this.route.params
    	.map(params => params['id'])
      .subscribe(partyId => {
        this.partyId = partyId;        
        if (this.partySubscription) {
          this.partySubscription.unsubscribe();
        }
        this.partySubscription = MeteorObservable.subscribe('party',this.partyId)
        	.subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
							this.party = Parties.findOne({_id: this.partyId});
              this.getUsers(this.party);
            })            
          });
      })

    if (this.uninvitedSub) {
      this.uninvitedSub.unsubscribe();
    } 

    this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId)
    	.subscribe( () => {
        this.getUsers(this.party);
        // this.users = Users.find({
        //   _id: {
        //     $ne: Meteor.userId()
        //   }
        // }).zone();
      })
  }

	getUsers(party: Party) {
    if (party) {
      this.users = Users.find({
        _id: {
          $nin: party.invited || [],
          $ne: Meteor.userId()
        }
      }).zone();
    }
  }

	get isOwner(): boolean {
    return this.party && this.user && this.user._id === this.party.owner;
  }

	get isPublic(): boolean {
    return this.party && this.party.public;
  }
 
  get isInvited(): boolean {
    if (this.party && this.user) {
      const invited = this.party.invited || [];
      return invited.indexOf(this.user._id) !== -1;
    }
 
    return false;
  }

	get lat(): number {
    return this.party && this.party.location.lat;
  }
 
  get lng(): number {
    return this.party && this.party.location.lng;
  }
 
  mapClicked($event: MouseEvent) {
    this.party.location.lat = $event.coords.lat;
    this.party.location.lng = $event.coords.lng;
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
    this.partySubscription.unsubscribe();
    this.uninvitedSub.unsubscribe();
  }

	invite(user: Meteor.User) {
    MeteorObservable.call('invite', this.party._id, user._id).subscribe(() => {
      alert('User successfully invited.');
    }, (error) => {
      alert(`Failed to invite due to ${error}`);
    });
  }

  reply(rsvp: string) {
    MeteorObservable.call('reply', this.party._id, rsvp).subscribe(() => {
      alert('You successfully replied.');
    }, (error) => {
      alert(`Failed to reply due to ${error}`);
    });
  }

  saveParty() {
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
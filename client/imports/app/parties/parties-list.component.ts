import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { PagingOptions } from '../../../../both/models/paging-options';
import 'rxjs/add/operator/combineLatest';

import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template
})
@InjectUser('user')
export class PartiesListComponent implements OnInit, OnDestroy {
  parties:Observable<Party[]>;
	subscription : Subscription;
	pageSize: Subject<number> = new Subject<number>();
  currentPage: Subject<number> = new Subject<number>();
  nameOrder: Subject<number> = new Subject<number>();
	optionsSub: Subscription;
	partiesSize: number = 0;
  autorunSub: Subscription;
	location: Subject<string> = new Subject<string>();
	user: Meteor.User;
	imagesSubs: Subscription;

	constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.optionsSub = Observable.combineLatest(
      this.pageSize,
      this.currentPage,
      this.nameOrder,
      this.location
    ).subscribe(([pageSize, currentPage, nameOrder,location]) => {
      const options: PagingOptions = {
        limit: pageSize as number,
        skip: ((currentPage as number) - 1) * (pageSize as number),
        sort: { name: nameOrder as number }
      };

			this.paginationService.setCurrentPage(this.paginationService.defaultId, currentPage as number);

	    if ( this.subscription ) {
  	    this.subscription.unsubscribe();      
    	}
	    this.subscription = MeteorObservable
  	  	.subscribe('parties',options, location).subscribe(() => {
        	this.parties = Parties.find({},{
            sort: {
              name: this.nameOrder
            }
          }).zone();
      });      
    })		

		this.paginationService.register({
      id: this.paginationService.defaultId,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.partiesSize
    });

    this.pageSize.next(10);
    this.currentPage.next(1);
    this.nameOrder.next(1);
    this.location.next('');

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.partiesSize = Counts.get('numberOfParties');
      this.paginationService.setTotalItems(this.paginationService.defaultId, this.partiesSize);
    });

    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
  }

	isOwner(party: Party) : boolean {
    return this.user && this.user._id === party.owner;
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
    this.imagesSubs.unsubscribe();
  }

	onPageChanged(page: number): void {
    this.currentPage.next(page);
  }

	changeSortOrder(nameOrder: string): void {
    this.nameOrder.next(parseInt(nameOrder));
  }

  removeParty(party: Party) {
    if ( !Meteor.userId() ) {
			alert("Need to login to remove party.");
      return;
    }
    Parties.remove(party._id);
  }

  search(value: string) {  
    this.currentPage.next(1);
    this.location.next(value);  
    // this.parties = Parties.find(value ? {location: value} : {}).zone();
  }
}
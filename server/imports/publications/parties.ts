import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Parties } from '../../../both/collections/parties.collection';
import { PagingOptions } from '../../../both/models/paging-options';

// NOTICE: array function will not work for `this`
Meteor.publish('parties', function(options: PagingOptions, location? : string) {
  const selector = buildQuery.call(this, null, location);

	Counts.publish(this, 'numberOfParties', Parties.collection.find(selector), { noReady: true });
  return Parties.find(selector, options);
});
 
Meteor.publish('party', function(partyId: string) {
  return Parties.find(buildQuery.call(this, partyId));
});
 
function buildQuery(partyId?: string, location?: string): Object {
  const isAvailable = {
    $or: [{
      // party is public
      public: true
    },
    // or
    { 
      // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  };
 
  // if (partyId) {
  //   return {
  //     // only single party
  //     $and: [{
  //         _id: partyId
  //       },
  //       isAvailable
  //     ]
  //   };
  // }
 
  // return isAvailable;
  const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };
 
  return {
    $and: [{
        location: searchRegEx
      },
      isAvailable
    ]
  };
}
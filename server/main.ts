import { Meteor } from 'meteor/meteor';
 
import { preloadData } from './imports/fixtures/parties';
 
Meteor.startup(() => {
  preloadData();
});

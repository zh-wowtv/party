import { Meteor } from 'meteor/meteor';
 
import { preloadData } from './imports/fixtures/parties';
import './imports/publications/parties';

Meteor.startup(() => {
  preloadData();
});

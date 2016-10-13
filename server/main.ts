import { Meteor } from 'meteor/meteor';
 
import { preloadData } from './imports/fixtures/parties';
import './imports/publications/parties';
import './imports/publications/users';

Meteor.startup(() => {
  preloadData();
});

import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function preloadData() {
  // only load data when the database is empty
  if (Parties.find().cursor.count() === 0) {
    const parties : Party[] = [
			{
        name: 'House warming',
        description: 'I moved to a new house',
        location: 'Singapore'
      },
			{
        name: 'Swimming',
        description: 'At swimming pool',
        location: 'Shanghai'
      },
			{
        name: 'Rainbow',
        description: 'I saw rainbow today',
        location: 'Shenzhen'
      }      
    ];

		parties.forEach((party : Party) => Parties.insert(party));    
  }
}
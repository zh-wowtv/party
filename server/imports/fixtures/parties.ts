import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function preloadData() {
  
  // only load data when the database is empty
  if (Parties.find().cursor.count() === 0) {
    // const parties : Party[] = [
		// 	{
    //     name: 'House warming',
    //     description: 'I moved to a new house',
    //     location: 'Singapore',
    //     public: true
    //   },
		// 	{
    //     name: 'Swimming',
    //     description: 'At swimming pool',
    //     location: 'Shanghai',
    //     public: true
    //   },
		// 	{
    //     name: 'Rainbow',
    //     description: 'I saw rainbow today',
    //     location: 'Shenzhen',
    //     public: false
    //   }      
    // ];

		// parties.forEach((party : Party) => Parties.insert(party));    

    for (var i = 0; i < 27; i++) {
		  Parties.insert({
		    name: Fake.sentence(50),
		    location: Fake.sentence(10),
		    description: Fake.sentence(100),
		    public: true
		  });
		}
  }
}
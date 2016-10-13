import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function preloadData() {
  
  // only load data when the database is empty
  if (Parties.find().cursor.count() === 0) {
    const parties : Party[] = [
			{
        name: 'House warming',
        description: 'I moved to a new house',
        location: 'Singapore',
        public: true
      },
			{
        name: 'Swimming',
        description: 'At swimming pool',
        location: 'Shanghai',
        public: true
      },
			{
        name: 'Rainbow',
        description: 'I saw rainbow today',
        location: 'Shenzhen',
        public: false
      },
      {
        name: 'My own party',
        description: 'This is a nice party',
        location: 'Shenzhen',
        public: false
      },      
      {
        name: 'Party ABC',
        description: 'This is ABC',
        location: 'SG',
        public: true
      },      
      {
        name: 'Party ABC',
        description: 'This is ABC',
        location: 'SG',
        public: true
      },
      {
        name: 'Party ABB',
        description: 'This is ABB',
        location: 'SG',
        public: true
      },     
      {
        name: 'Party ABD',
        description: 'This is ABD',
        location: 'SG',
        public: true
      },      
      {
        name: 'Party ABE',
        description: 'This is ABE',
        location: 'SH',
        public: true
      },
      {
        name: 'Party BAA',
        description: 'This is BAA',
        location: 'SG',
        public: true
      }      
    ];

		parties.forEach((party : Party) => Parties.insert(party));    

    // for (var i = 0; i < 27; i++) {
		//   Parties.insert({
		//     name: Fake.sentence(50),
		//     location: Fake.sentence(10),
		//     description: Fake.sentence(100),
		//     public: true
		//   });
		// }
  }
}
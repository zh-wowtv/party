import { CollectionObject } from './collection-object.model';

interface RSVP {
  userId: string;
  response: string;
}

export interface Party extends CollectionObject {
  name: string;
  description: string;
  location: string;
  owner?: string;
  public: boolean;
  invited?: string[];
  rsvps?: RSVP[];
}

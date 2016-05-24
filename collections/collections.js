import {Mongo} from 'meteor/mongo';

// export access to my collections

//
export const playersCollection = new Mongo.Collection("players");

//Database for chat messages
export const messages = new Mongo.Collection("messages");

//Database for user's personal information
playerPersonalInfo = new Mongo.Collection("personalInformation");




/*****************************************************************

Dummy data for users

****************************************************************/

export const playersDummyData = [
  {
    "email": "bob@mail.com",
    "name": "Jane",
    "stamina": 20,
    "money": 0,
    "room": "room",
    "owner": "MFMamju3rr2tn554E",
    "admin": false
  },
  {
    "email": "Admin@mail.com",
    "name": "Bob",
    "stamina": 45,
    "money": 2341,
    "room": "room",
    "owner": "5Gqog8zMmukYnwqYp",
    "admin": true
  },
  {
    "email": "janedoe@mail.com",
    "name": "J",
    "stamina": 20,
    "money": 0,
    "room": "room",
    "owner": "",
    "admin": false
  }
];


/**************************************************************

end of dummy data for users

**************************************************************/

// Import the Mongo object
import { Mongo } from "meteor/mongo";

// export access to my collections
export const playersCollection = new Mongo.Collection("players");
export const messages = new Mongo.Collection("messages");

export const playersDummyData = [
  {
    "userName": "default",
    "name": "Jane",
    "stamina": 20,
    "money": 0,
    "room": "room"
  },
  {
    "userName": "bob123",
    "name": "Bob",
    "stamina": 45,
    "money": 2341,
    "room": "room"
  }
];

export const messagesDummyData = [
  {
    "name": "Billy",
    "message": "Hello is there anyone out there?"
  },
  {
    "name": "Billy",
    "message": "Guess not."
  },
  {
    "name": "God",
    "message": "I'm always here, Billy."
  }
]

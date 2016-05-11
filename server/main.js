import { Meteor } from 'meteor/meteor';
import { playersCollection } from '../collections/collections.js';
import { playersDummyData } from '../collections/collections.js';
import { messages } from '../collections/collections.js';
import { messagesDummyData } from '../collections/collections.js';
Meteor.startup(() => {

  playersCollection.remove({});

  // add my dummy values
  for (var i = 0; i < playersDummyData.length; i++) {
    playersCollection.insert(playersDummyData[i]);
  };

  for (var i = 0; i < messagesDummyData.length; i++) {
    messages.insert(messagesDummyData[i]);
  }

});

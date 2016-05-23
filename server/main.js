import { Meteor } from 'meteor/meteor';
import { playersCollection } from '../collections/collections.js';
import { playersDummyData } from '../collections/collections.js';
import { messages } from '../collections/collections.js';

Meteor.startup(() => {

  //Used to publish the data from the playersCollection database.
  Meteor.publish('theUser', function(){
    var currentUserIdentification = this.userId;
    return playersCollection.find({owner: currentUserIdentification});
  });

  //Used to publish the data from the messages database.
  Meteor.publish('theUserMessage', function(){
    return messages.find({public: true});
  });

  playersCollection.remove({});

  // add my dummy values
  for (var i = 0; i < playersDummyData.length; i++) {
    playersCollection.insert(playersDummyData[i]);
  };


});


//Meteor methods for updating, inserting, or deleting data from the databases
Meteor.methods({
  'roomChangerOffice': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$set: {room: 'office'}});
  },

  'roomChangerBar': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$set: {room: 'bar'}});
  },

  'roomChangerUserRoom': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$set: {room: 'room'}});
  },

  'increaseStamina': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$inc: {stamina: 10}});
  },

  'increaseMoney': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$inc: {stamina: -1, money: 10}});
  },

  'decreaseMoney': function(){
    var currentPlayer = Meteor.userId();
    playersCollection.update({owner: currentPlayer}, {$inc: {money: -5}});
  },

  'newUserMessage': function(userMessage){
    var currentPlayer = Meteor.userId();
    //save our message
    messages.insert({
      public: true,
      message: userMessage,
      name: playersCollection.findOne({owner: currentPlayer}).name,
      owner: currentPlayer,
      date: 'Today' // the today is temporary until the date function is found and used in its place
    });
  }
});

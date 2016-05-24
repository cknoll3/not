import { Meteor } from 'meteor/meteor';
import { playersCollection } from '../collections/collections.js';
import { playersDummyData } from '../collections/collections.js';
import { messages } from '../collections/collections.js';


Meteor.startup(() => {

  //Used to publish the data from the playersCollection database.
  Meteor.publish('theUser', function(){
    var currentUserIdentification = this.userId;
    return Meteor.users.find({_id: currentUserIdentification});
  });

  //Used to publish the data from the messages database.
  Meteor.publish('theUserMessage', function(){
    return messages.find({public: true});
  });


  // add my dummy values
  for (var i = 0; i < Meteor.users.length; i++) {
    Meteor.users.insert(Meteor.users[i]);
  };


});

/*******************************************************************

for adding in new users
********************************************************************/
Accounts.onCreateUser(function(options, user){
  if(options.profile){
    user.profile = options.profile;
  }else{
    user.profile = {};
  }
  user.profile.name = 'Bob';
  user.profile.money = 100;
  user.profile.stamina = 20;
  user.profile.room = 'room';
  return user;
});

/********************************************************************

End of adding in users

**********************************************************************/


//Meteor methods for updating, inserting, or deleting data from the databases
Meteor.methods({
  'roomChangerOffice': function(){
    var currentPlayer = Meteor.userId();
    Meteor.users.update({_id: currentPlayer}, {$set: {"profile.room": 'office'}});
  },

  'roomChangerBar': function(){
    var currentPlayer = Meteor.userId();
    Meteor.users.update({_id: currentPlayer}, {$set: {"profile.room": 'bar'}});
  },

  'roomChangerUserRoom': function(){
    var currentPlayer = Meteor.userId();
  Meteor.users.update({_id: currentPlayer}, {$set: {"profile.room": 'room'}});
  },

  'increaseStamina': function(){
    var currentPlayer = Meteor.userId();
    Meteor.users.update({_id: currentPlayer}, {$inc: {"profile.stamina": 10}});
  },

  'increaseMoney': function(){
    var currentPlayer = Meteor.userId();
    Meteor.users.update({_id: currentPlayer}, {$inc: {"profile.stamina": -1, "profile.money": 10}});
  },

  'decreaseMoney': function(){
    var currentPlayer = Meteor.userId();
    Meteor.users.update({_id: currentPlayer}, {$inc: {"profile.money": -5}});
  },

  'newUserMessage': function(userMessage){
    var currentPlayer = Meteor.userId();
    //save our message
    messages.insert({
      public: true,
      message: userMessage,
      name: Meteor.users.findOne({_id: currentPlayer}).profile.name,
      owner: currentPlayer,
      date: 'Today' // the today is temporary until the date function is found and used in its place
    });
  }
});

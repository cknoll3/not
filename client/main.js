import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { playersCollection } from '../collections/collections.js';
import { messages } from "../collections/collections.js";

import './main.html';

//This let's the user have access to the data from the playersCollection database
Meteor.subscribe('theUser');


Meteor.subscribe('theUserMessage');
/***************************************************************

chat stuff

*****************************************************************/

function scrollChat(){
  var height = $('#chatMessages')[0].scrollHeight;

  $('#chatMessages').scrollTop(height);
};

Template.addMessageForm.onCreated(function() {
  //save some initial data for our messaging application
  Session.setDefault('messages', []);
});

Template.addMessageForm.events({
  'submit .newMessage': function(event, template) {
    //prevent the form from refreshing the page
    event.preventDefault();

    //get our form value (message text)
    var messageText = $('#messageText').val();

    Meteor.call('newUserMessage', messageText);

    $('#messageText').val("");

    scrollChat();
  }
});

Template.messageList.helpers({
  allMessages: function() {
    return messages.find();
  }
});

// Scroll chat any time it's rendered on screen
Template.messageList.onRendered(function() {
  scrollChat();
});

Template.registerHelper('messagesExist', function() {
  return Session.get('messages').length > 0;
});



/*********************************************************

end of chat stuff

******************************************************/




/*************************************************************

default player

****************************************************************/

// Set variable with character user name after login
var loggedInUser = Meteor.userId();
var trueAdmin = true;



if(loggedInUser){
console.log(loggedInUser);


  var character = Meteor.users.findOne({_id: loggedInUser});
  var characterPersonalInfo = playerPersonalInfo.findOne({name: "Bob"});




  /*
  Both isAdmin and character variables are coming up as undefired, but i know
  it's picking up the value for both parts.
  */


  Template.userPersonalInfo.helpers({
    characterPersonalInfo: function(){
      return playerPersonalInfo.findOne({name: "Bob"});
    }
  });

  Template.loggedPlayer.helpers({
    character: function() {
      //retrieve all bookmarks from our collection
      return Meteor.users.findOne({_id: loggedInUser});
      console.log(loggedInUser);
    }
  });
}

/*********************************************************

end of default player

******************************************************/

/*********************************************************

click events with buttons for action

******************************************************/

Template.navigation.events({
  'click #room': function(event, template){
    $('#noRest').removeAttr('id');
    $('#drink').hide();
    $('#money').hide();
    $('#sleep').show();

    Meteor.call('roomChangerUserRoom');
  },

  'click #bar': function(event, template){
    $('#noDrinking').removeAttr('id');
    $('#sleep').hide();
    $('#money').hide();
    $('#drink').show();

    Meteor.call('roomChangerBar');
  },

  'click #office': function(event, template){
    $('#noMoney').removeAttr('id');
    $('#sleep').hide();
    $('#drink').hide();
    $('#money').show();

    Meteor.call('roomChangerOffice');
  },

  'click #money': function(event, template){
    Meteor.call('increaseMoney');
  },

  'click #sleep': function(event, template){
    Meteor.call('increaseStamina');
  },

  'click #drink': function(event, template){
  Meteor.call('decreaseMoney');
  }
});

/*********************************************************

end of click events for actions

******************************************************/

Template.headerNavigation.events({
  'click #home': function(event, template){
    $('#sleep').hide();
    $('#drink').hide();
    $('#money').hide();
  },

  'click #myAccount': function(event, template){
    $('#sleep').hide();
    $('#drink').hide();
    $('#money').hide();
  }
});

/*********************************************************

Event for updating the user's person info

******************************************************/

Template.editAccountInfo.events({});


/*********************************************************

end of updating the user's person info

******************************************************/

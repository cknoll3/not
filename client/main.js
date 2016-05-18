import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { playersCollection } from '../collections/collections.js';
import { messages } from "../collections/collections.js";

import './main.html';

/**************************************
---------------- CHAT -----------------
***************************************/
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
    $('#messageText').val(''); // remove text from our message box

    //save our message
    messages.insert({
      message: messageText,
      name: playersCollection.findOne({userName: loggedInUser}).name
    });

    scrollChat();
  }
});

Template.messageList.helpers({
  allMessages: function() {
    return messages.find();
  }
});

Template.registerHelper('messagesExist', function() {
  return Session.get('messages').length > 0;
});

/**************************************
--------------PLAYER SIDEBAR ----------
***************************************/
// Set variable with character user name after login
var loggedInUser = Meteor.user(); // Set this to the userName used on login if successful


if (loggedInUser === Meteor.user()) {
  loggedInUser = "default";
}

if(loggedInUser){
  var character = playersCollection.findOne({userName: "default"});

  Template.player.helpers({
    character: function() {
      //retrieve all bookmarks from our collection
      return playersCollection.findOne({userName: loggedInUser});
    }
  });
}


/**************************************
------------- ROOM --------------------
***************************************/


Template.player.events({
  'click #room': function(event, template){
    $('body').removeClass().addClass('room');
    $('.myBarButton').hide();
    $('.myMoneyMaker').hide();
    $('#noRest').removeAttr('id');
    $('.resting').show();

    var playerId = this._id;
    Session.set('selectedUser', playerId);
    console.log(playerId);

    //Updates the room name to the correct room.
    var selectedUser = Session.get('selectedUser');
    playersCollection.update({_id: selectedUser}, {$set: {room: 'room'}});
  },

  'click #bar': function(event, template){
    $('body').removeClass().addClass('bar');
    $('#noDrinking').removeAttr('id');
      $('.myBarButton').show();
      $('.myMoneyMaker').hide();
      $('.resting').hide();

      var playerId = this._id;
      Session.set('selectedUser', playerId);
      console.log(playerId);

      var selectedUser = Session.get('selectedUser');
    playersCollection.update({_id: selectedUser}, {$set: {room: 'bar'}});
  },

  'click #office': function(event, template){
    $('body').removeClass().addClass('office');
    $('#noMoney').removeAttr('id');
    $('.myBarButton').hide();
    $('.myMoneyMaker').show();
    $('.resting').hide();

    var playerId = this._id;
    Session.set('selectedUser', playerId);
    console.log(playerId);

    var selectedUser = Session.get('selectedUser');
    playersCollection.update({_id: selectedUser}, {$set: {room: 'office'}});
  },

  'click #money': function(event, template){
    var selectedUser = Session.get('selectedUser');
    console.log(selectedUser);
    playersCollection.update({_id: selectedUser}, {$inc: {stamina: -1, money: 10}});
  },

  'click #sleep': function(event, template){
    var selectedUser = Session.get('selectedUser');
    console.log(selectedUser);
    playersCollection.update({_id: selectedUser}, {$inc: {stamina: 10}});
  },

  'click #drink': function(event, template){
    var selectedUser = Session.get('selectedUser');
    console.log(selectedUser);
    playersCollection.update({_id: selectedUser}, {$inc: {money: -5}});
  }



});

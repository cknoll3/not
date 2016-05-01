import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var character = {name: "Jane", stamina: 23, money: 10300};
Session.set('character', character);

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

    //get our data source (from session)
    var messages = Session.get('messages');

    //save our message
    messages.push({
      messageText: messageText,
      name: character.name
    });

    Session.set('messages', messages);

    scrollChat();
  }
});

Template.messageList.helpers({
  allMessages: function() {
    return Session.get('messages');
  }
});

Template.player.helpers({
  stamina: function() {
    return Session.get('character').stamina;
  },

  money: function() {
    return Session.get('character').money;
  },

  name: function() {
    return Session.get('character').name;
  }
})

//global helpers
Template.registerHelper('messagesExist', function() {
  return Session.get('messages').length > 0;
});

/***************************************************************

This is for routing

******************************************************************/

var previousSite = 'index';
var site;

Router.configure({
  layoutTemplate:'pageLayout'
});


Router.route('/', {
  name: 'index'
});

Router.route('/userRoomPage');

Router.route('/bar');

Router.route('/office');

Router.route('/userPersonalInfo');

Router.route('/editAccountInfo');

Router.onBeforeAction(function(){
  $('body').removeClass(previousSite);
  this.next();
});

Router.onBeforeAction(function() {
  site = $('body').addClass(this.route.getName());
  previousSite = this.route.getName();
  console.log(previousSite);
  console.log(site);
  this.next();
});

Router.onBeforeAction(function(){
  if(!Meteor.user()){
    Router.go('/');
    this.next();
  }else {
    this.next();
  }
});

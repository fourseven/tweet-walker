var Clumps = new Meteor.Collection("clumps");



if (Meteor.isClient) {
  $.fn.serializeObject = function()
  {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };
  // Template.hello.greeting = function () {
  //   return "Welcome to tweet-walker.";
  // };

  // Template.hello.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });

  Template.clump_new.events({
    'submit': function (event) {
      event.preventDefault();
      var newClump = $(event.currentTarget).serializeObject();
      newClump.ownerId = Meteor.userId();
      Clumps.insert(newClump);
    }
  });
  Template.clumps.clumps = function() {
    return Clumps.find({});
  };

  Template.clump.events({
    'click .remove': function (event) {
      event.preventDefault();
      Clumps.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    "test": function() {
        //should print the user details if logged in, undefined otherwise.
        console.dir(Meteor.user());
    }
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

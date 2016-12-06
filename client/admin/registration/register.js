Template.register.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        
        username = username.replace(/\s/g, "");

        Accounts.createUser({
		    username: username,
		    password: password
		}, function(error){
		    if(error){
		        alert(error.reason); 
		    } else {
		        Router.go("Locations"); // Redirect user if registration succeeds
		    }
		});

        //code after registering
    }
});
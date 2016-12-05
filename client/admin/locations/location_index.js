import { location } from '../../../lib/collections/locations.js'

Template.Locations.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('locations')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.Locations.helpers ({
	locations: function() {
		const locations  = location.find({}).fetch()		
		return locations
	}
	 
})


Template.Locations.events({
	'click #add-location-button' : function (e) {
		 FlowRouter.go('/addLocation')
	}
})
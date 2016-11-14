import { location } from '../../../lib/collections/locations.js'

Template.Locations.helpers ({
	locations: function() {
		const locations  = location.find({}).fetch()
		//console.log(locations)
		return locations
	}
	 
})


Template.Locations.events({
	'click #add-location-button' : function (e) {
		 FlowRouter.go('/addLocation')
	}
})
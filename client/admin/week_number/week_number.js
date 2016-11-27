import { weekNoCollection  } from '../../../lib/collections/week_no.js'

Template.weekNumber.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.weekNumber.helpers ({
	weekData: function() {
		const weekData = weekNoCollection.find({}).fetch()

		return weekData
	}
	 
})
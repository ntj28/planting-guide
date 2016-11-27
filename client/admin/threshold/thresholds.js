import { thresholdsCollection  } from '../../../lib/collections/thresholds.js'


Template.Thresholds.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.Thresholds.helpers ({
	thresholdData: function() {
		const thresholdData = thresholdsCollection.find({}).fetch()
		return thresholdData
	}
	 
})

Template.Thresholds.events({
	'click #add-threshold-button' : function (e) {
		 FlowRouter.go('/addThreshold')
	}
})
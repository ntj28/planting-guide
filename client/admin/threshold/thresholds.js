import { thresholdsCollection  } from '../../../lib/collections/thresholds.js'

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
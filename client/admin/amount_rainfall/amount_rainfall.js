import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js'

Template.Rainfall.helpers ({
	rainfall_data: function() {
		const awsID = FlowRouter.getParam('awsID')
		const rainfall_data   = amountRainfallCollection.find({awsID: awsID }).fetch()
		return rainfall_data
	}
	 
})
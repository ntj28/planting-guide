import { weekNoCollection  } from '../../../lib/collections/week_no.js'

Template.weekNumber.helpers ({
	weekData: function() {
		const weekData = weekNoCollection.find({}).fetch()

		return weekData
	}
	 
})
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

Meteor.methods ({
	'add-amount-rainfall' : function (location_id, date,amount_rainfall) {
		amountRainfallCollection.insert({
			location_id : location_id,
			date: date,
			amount_rainfall :  amount_rainfall			 
		})
	} ,

	'sample' : function () {
		console.log('called')
	}
})
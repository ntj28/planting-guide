import { tenDaysForecast } from '../../lib/collections/forecast_ten_days.js'

Meteor.methods ({
	'add-forecast-rainfall' : function (awsID,date,rainfall) {
		tenDaysForecast.insert ({
			awsID : awsID,
			date: date,
            rainfall:rainfall	 

		})
	},


	'delete-forecast-rainfall': function(awsID){
        tenDaysForecast.remove({
            awsID:awsID
        })
    },

	 
})
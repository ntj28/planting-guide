import { durationYields } from '../../lib/collections/duration_yield.js'
import { tenDaysForecast  } from '../../lib/collections/forecast_ten_days.js'
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'


Meteor.methods ({

	'tenDays-rainfall-data' : function(awsID)  {
		let tenDataRainfall = []
		let dateLabel =[]
		let totalTenDaysForecast =0
		let tenDaysData = tenDaysForecast.find({awsID:awsID})
		tenDaysData.forEach((item)=>{
		 	dateLabel.push(`${item.date}`)
			tenDataRainfall.push(`${item.rainfall}`)
			totalTenDaysForecast = parseFloat(totalTenDaysForecast) + parseFloat(`${item.rainfall}`)

		})	

		return {dateLabel:dateLabel,tenDataRainfall: tenDataRainfall,totalTenDaysForecast:totalTenDaysForecast};


	},

	



})






import { durationYields } from '../../lib/collections/duration_yield.js'
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'


Meteor.methods ({

	'daily-rainfall-data' : function(awsID,dateMongo,dateEnteredOriginal)  {

		let label = []
		let dataDaily = []
		let amountRain  = amountRainfallCollection.find({$and:[{awsID:awsID},{date:{$gte:dateMongo,$lte:dateEnteredOriginal}}]})//.sort( { '$date': 1 })//.fetch()
		amountRain.forEach((item)=>{
			//const date = `${item.date}`
			label.push(`${item.date}`)
			dataDaily.push(`${item.amount_rainfall}`)
			//const city = `${item.city}`
			//cityNoSpace =city.replace(" ","_")
			//console.log(provinceNoSpace + " city" + cityNoSpace)
		})

		return {label: label,dataDaily: dataDaily};


	},

	



})
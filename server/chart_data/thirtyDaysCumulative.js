import { durationYields } from '../../lib/collections/duration_yield.js'
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'


Meteor.methods ({

	'thirty-rainfall-data' : function(awsID,dateMongo,numberOfEntries)  {

		let thirtyDaysCumulative =[]
		let dateSixtyDays = new Date()
		dateSixtyDays.setDate(dateSixtyDays.getDate() - 60)
		let dateMongoSixty  = dateSixtyDays.toISOString().slice(0,10).replace(/-/g,"-");

		let startSixty = new Date(dateMongoSixty)
		let startThirty = new Date (dateMongo)
		let totalSixty = 0
		let thirtyDaysAccumulatedRainfall =0
		for (i =0 ; i<numberOfEntries ; i++){

			 startSixty.setDate(startSixty.getDate() + 1);
			 
			 
			 let startSixtyMongo =startSixty.toISOString().slice(0,10).replace(/-/g,"-");
			 let startThirtyMongo =startThirty.toISOString().slice(0,10).replace(/-/g,"-");			 
			 let amountRainSixty  = amountRainfallCollection.find({
			 	$and:[{
			 		awsID:awsID
			 	},{
			 		date:{$gte:startSixtyMongo,$lte:startThirtyMongo}}]})
			 
			 amountRainSixty.forEach((item)=>{			 
			 var data = `${item.amount_rainfall}`
			 var floatData = parseFloat(data)

			 if (isNaN(floatData)) {

			 	floatData = 0

			 }


			 totalSixty = parseFloat(totalSixty) +  floatData
			
			})

			totalSixty = totalSixty.toFixed(2);
			thirtyDaysAccumulatedRainfall = parseFloat(thirtyDaysAccumulatedRainfall) + parseFloat(totalSixty)
			thirtyDaysCumulative.push(totalSixty)			
			totalSixty = 0
			startThirty.setDate(startThirty.getDate() + 1);
		
		}
		return {thirtyDaysCumulative: thirtyDaysCumulative,thirtyDaysAccumulatedRainfall:thirtyDaysAccumulatedRainfall};


	},

	



})
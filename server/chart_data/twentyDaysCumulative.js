import { durationYields } from '../../lib/collections/duration_yield.js'
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'


Meteor.methods ({

	'twenty-rainfall-data' : function(awsID,dateMongo,numberOfEntries)  {
		let twentyDaysCumulative =[]
		let dateCurrentTwenty = new Date()
		let dateCurrentForty = new Date()
		dateCurrentForty.setDate(dateCurrentTwenty.getDate() -50)
		let dateMongoForty  = dateCurrentForty.toISOString().slice(0,10).replace(/-/g,"-");
		 

		let startForty = new Date(dateMongoForty)
		let startThirtyTwenty = new Date (dateMongo)
		let totalTwenty = 0
		let twentyDaysAccumulatedRainfall = 0

		for (i =0 ; i<numberOfEntries ; i++){

			 
			 
			 startForty.setDate(startForty.getDate() + 1);
			 let startFortyMongo =startForty.toISOString().slice(0,10).replace(/-/g,"-");
			 let startThirtyTwentyMongo =startThirtyTwenty.toISOString().slice(0,10).replace(/-/g,"-");
			 //label.push(startThirtyMongo)
			 //console.log("date 30 days " + startThirtyTwenty + "date 20 previous " +startForty)

			 //console.log ('sixty days' +startSixtyMongo)
			 //console.log ('thirty days' +startThirtyMongo)

			 let amountRainTwenty  = amountRainfallCollection.find({$and:[{awsID:awsID},{date:{$gte:startFortyMongo,$lte:startThirtyTwentyMongo}}]})//.sort( { '$date': 1 })//.fetch()
			 
			 amountRainTwenty.forEach((item)=>{
			 //const date = `${item.date}`
			 var data = `${item.amount_rainfall}`
			 var floatData = parseFloat(data) 
			 //console.log(data)
			  


			 if (isNaN(floatData)) {

			 	floatData = 0

			 }

			 totalTwenty = parseFloat(totalTwenty) + floatData


			
	 		 
			 //const city = `${item.city}`
			 //cityNoSpace =city.replace(" ","_")
			 //console.log(provinceNoSpace + " city" + cityNoSpace)
			})
			totalTwenty = totalTwenty.toFixed(2);
			twentyDaysAccumulatedRainfall = parseFloat(twentyDaysAccumulatedRainfall) + parseFloat(totalTwenty)
			twentyDaysCumulative.push(totalTwenty)
			
			totalTwenty = 0
			startThirtyTwenty.setDate(startThirtyTwenty.getDate() + 1);

		
		}
		console.log("total Twenty " +twentyDaysAccumulatedRainfall )

		return {twentyDaysCumulative: twentyDaysCumulative,twentyDaysAccumulatedRainfall:twentyDaysAccumulatedRainfall};


		},

	



})
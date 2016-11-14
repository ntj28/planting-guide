//import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'
//import { durationYields } from '../../lib/collections/duration_yield.js'

//Meteor.autorun(() => {
 //   console.log('somehting')
    
///});


//let locationID = durationYields.find({locationID:location_id});

//durationYieldData.forEach((item)=>{
//		const province = `${item.province}`
//		provinceNoSpace =province.replace(" ","_")
//		const city = `${item.city}`
//		cityNoSpace =city.replace(" ","_")
//		const locationID = `${item.locationID}`

//		let rainfallLocationCount = amountRainfallCollection.find({location_id:locationID}).count()

//		if (rainfallLocationCount ==0 ){

			//no entries yet so retrieve data from wunderground api but only 10 calls per minute
//			for (i= 0; i<10; i++) {

			

//			date.setDate(date.getDate() - 3);	
//			var resultDate = date.toISOString().slice(0,10).replace(/-/g,"");
//			var result  = date.toISOString().slice(0,10).replace(/-/g,"-");
			//console.log(result)



			//Meteor.call('getDataWunderground', resultDate,provinceNoSpace,cityNoSpace, function(err,response){ 
	  		 
	  		//Meteor.call('add-amount-rainfall',location_id, date,response.data.history.dailysummary[0].precipi )
	  		//var precip_in = response['history'];	
	  		// console.log(response.data.history.dailysummary[0].precipi)
	  		//console.log(response)
		//});

//	}


//		}


//		else {
			//check if the  existing data is the updated
//			console.log ('were here again')

//		}




//	})
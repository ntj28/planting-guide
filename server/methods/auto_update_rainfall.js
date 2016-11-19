import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'
import { durationYields } from '../../lib/collections/duration_yield.js'
import { tenDaysForecast } from '../../lib/collections/forecast_ten_days.js'
import { location } from '../../lib/collections/locations.js'
//use cron 

Meteor.setInterval(function autoUpdate() {

		
		let cityNoSpace
		let provinceNoSpace
		//let location_id
		let awsID
		let done = false
		let highestDate
		let date = new Date()

		//getting the  weather station id,city and province
		let locationCollection = location.find({})
			locationCollection.forEach((item)=>{

				const province = `${item.province}`
				provinceNoSpace =province.replace(" ","_")
				const city = `${item.city}`
				cityNoSpace =city.replace(" ","_")
				//location_id = `${item.locationID}`
				awsID = `${item.awsID}`



		//retrieving the province, city and location id for the data in the  duration yield
		//let durationYieldData  = durationYields.find({})
		//	durationYieldData.forEach((item)=>{
				//done =false
		//		const province = `${item.province}`
		//		provinceNoSpace =province.replace(" ","_")
		//		const city = `${item.city}`
		//		cityNoSpace =city.replace(" ","_")
		//		location_id = `${item.locationID}`



				//retrieving the highest date for the tens days forecast collection
				let tensDaysForecast  = tenDaysForecast.find({awsID:awsID},{limit: 1,sort: {date: -1}})
					tensDaysForecast.forEach((item)=>{
						highestDate = `${item.date}`
						 
					}) 



				let  dateTen = new Date()
				dateTen.setDate(dateTen.getDate() + 9)
				let dateFormatted  = dateTen.toISOString().slice(0,10).replace(/-/g,"-")
				console.log ("date in mongo highest" + highestDate + "forecast 10 " +dateFormatted)	
				//console.log ('highest date mongo ' + highestDate + 'highest date + 10 ' +  dateFormatted)
				if (dateFormatted > highestDate) {
					//delete the existing data
					Meteor.call('delete-forecast-rainfall',awsID)

					//insert new data to update the ten day forecast
					//get the  ten days forecast for each location id
					let counter =0 
					if(done == false) {
						//console.log('done before' + done) 
						counter = counter + 1
						//console.log('kapila ming sud' + counter)
						Meteor.call('getDataWundergroundForecast',provinceNoSpace,cityNoSpace,awsID, function(err,response){ 
	                        
	                        //looping through the data returned
	                        for (var i =0 ; i <=9 ; i++){
	                        	dateWundergroundData = response.data.forecast.simpleforecast.forecastday[i].date.year + "-"
	                        			 + response.data.forecast.simpleforecast.forecastday[i].date.month +"-"
	                        			 + response.data.forecast.simpleforecast.forecastday[i].date.day;

	                        	var amount_rainfall = response.data.forecast.simpleforecast.forecastday[i].qpf_allday.mm;
	                        	//storing the data to mongo db
	                        	Meteor.call('add-forecast-rainfall',awsID,dateWundergroundData,amount_rainfall)
	                            //console.log('date' + date + 'rain ' +amount_rainfall )


	                        }

						                        

	                                 
	                    });


					}
					done = true
					console.log('done after loop' + done) 	

					

				}

				
				let rainfallCount  = amountRainfallCollection.find({awsID:awsID}).count()
				//since there is no data
				if (rainfallCount == 0){

					date.setDate(date.getDate() - 60);

					if (done == false) {

						for (i= 0; i<10; i++) {

							date.setDate(date.getDate() +1);
							//console.log('60 days before +1 ' + date)						
							let dateWunderground = date.toISOString().slice(0,10).replace(/-/g,"");
							let dateMongo  = date.toISOString().slice(0,10).replace(/-/g,"-");
							//console.log('kausa r call' + i)
							//retrieving the data from wunderground				
							Meteor.call('getDataWunderground', dateWunderground,provinceNoSpace,cityNoSpace,awsID, function(err,response){ 
						  		//storing the data to the  database 
						  		Meteor.call('add-amount-rainfall',awsID, dateMongo,response.data.history.dailysummary[0].precipm )
						  		 
							});
						 
				

						}

						done = true
						//console.log('value after loop '+ done)

					}

						

				}
				//add historical data until the highest date is equal to the current date 
				else {


					//let rainfallCount  = amountRainfallCollection.findOne({location_id:location_id},{sort: {date:  1}})
					let rainfall  = amountRainfallCollection.find({awsID:awsID},{limit: 1,sort: {date: -1}})
					rainfall.forEach((item)=>{
						highestDate = `${item.date}`
						 
					})



					date = new Date()
					date.setDate(date.getDate() -1);
					let dateCurrent  = date.toISOString().slice(0,10).replace(/-/g,"-");
					
					if (highestDate != dateCurrent ){


						if (done == false) {

							let dateToAdd = new Date(highestDate)
							
							for (i= 0; i<10; i++) {

								dateToAdd.setDate(dateToAdd.getDate() + 1);
								//console.log(dateToAdd)
								//console.log('60 days before +1 ' + date)						
								let dateWunderground = dateToAdd.toISOString().slice(0,10).replace(/-/g,"");
								let dateMongo  = dateToAdd.toISOString().slice(0,10).replace(/-/g,"-");
								//console.log('kausa r call' + i)
								if (dateMongo <= dateCurrent ){
									console.log('date current' + dateCurrent + 'mongodate' +dateMongo)
									//retrieving the data from wunderground				
									Meteor.call('getDataWunderground', dateWunderground,provinceNoSpace,cityNoSpace,awsID, function(err,response){ 
							  		//storing the data to the  database 
							  			Meteor.call('add-amount-rainfall',awsID, dateMongo,response.data.history.dailysummary[0].precipi )
							  		 
									});


								}

							

							}

							done = true
							//console.log('value after loop '+ done)

						}




					} 
					



				}
				
			})	



		 


        
        console.log('called after two minutes')
        
    }, 120000);

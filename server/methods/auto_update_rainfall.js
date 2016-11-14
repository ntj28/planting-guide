import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'
import { durationYields } from '../../lib/collections/duration_yield.js'

//use cron 

Meteor.setInterval(function sample() {

		
		let cityNoSpace
		let provinceNoSpace
		let location_id
		let done = false
		let highestDate
		let date = new Date()


		//retrieving the province, city and location id for the data in the  duration yield
		let durationYieldData  = durationYields.find({})
			durationYieldData.forEach((item)=>{
				done =false
				const province = `${item.province}`
				provinceNoSpace =province.replace(" ","_")
				const city = `${item.city}`
				cityNoSpace =city.replace(" ","_")
				location_id = `${item.locationID}`

				
				let rainfallCount  = amountRainfallCollection.find({location_id:location_id}).count()
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
							Meteor.call('getDataWunderground', dateWunderground,provinceNoSpace,cityNoSpace, function(err,response){ 
						  		//storing the data to the  database 
						  		Meteor.call('add-amount-rainfall',location_id, dateMongo,response.data.history.dailysummary[0].precipm )
						  		 
							});
						 
				

						}

						done = true
						//console.log('value after loop '+ done)

					}

						

				}
				//add historical data until the highest date is equal to the current date 
				else {


					//let rainfallCount  = amountRainfallCollection.findOne({location_id:location_id},{sort: {date:  1}})
					let rainfall  = amountRainfallCollection.find({location_id:location_id},{limit: 1,sort: {date: -1}})
					rainfall.forEach((item)=>{
						highestDate = `${item.date}`
						 
					})




					date.setDate(date.getDate());
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
									Meteor.call('getDataWunderground', dateWunderground,provinceNoSpace,cityNoSpace, function(err,response){ 
							  		//storing the data to the  database 
							  			Meteor.call('add-amount-rainfall',location_id, dateMongo,response.data.history.dailysummary[0].precipi )
							  		 
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




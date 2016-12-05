import { durationYields  } from '../../../lib/collections/duration_yield.js'
import { weekNoCollection  } from '../../../lib/collections/week_no.js'
import { thresholdsCollection  } from '../../../lib/collections/thresholds.js'
import { tenDaysForecast  } from '../../../lib/collections/forecast_ten_days.js'
import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js'
import { Meteor } from 'meteor/meteor'

Template.ChartRainfall.onCreated( () => {
	Meteor.subscribe('thresholds')
	Meteor.subscribe('WeekNo')
	Meteor.subscribe('durationYield')
  
});  


Template.ChartRainfall.rendered = () =>{

	//retrieving data from flow router
	const awsID = FlowRouter.getParam('awsID')
	const locationID = FlowRouter.getParam('locationID')
	const dateEntered = FlowRouter.getParam('date')	
	const crops = FlowRouter.getParam('cropTypes')
	const variety = FlowRouter.getParam('cropVariety')


	//date fro simulation 
	let dateEntry = new Date(dateEntered)
	let dateEnteredOriginal = dateEntry.toISOString().slice(0,10).replace(/-/g,"-");
	dateEntry.setDate(dateEntry.getDate() -30)
	let dateMongo  = dateEntry.toISOString().slice(0,10).replace(/-/g,"-");
	
	//current date
	let date  = new Date()
	let dateCurrent = date.toISOString().slice(0,10).replace(/-/g,"-"); 
	//entered date
	let dateEntred = new Date(dateEntered)
	dateEntred.setDate(dateEntred.getDate())
	let dateEnteredFormatted =dateEntred.toISOString().slice(0,10).replace(/-/g,"-"); 


	//daily rainfall
	let labelDate = []
	var dataDailyRainfall = []
	var num =0

	let dailyRainfall = []
	let thirtyDaysCumulative =[]
	let twentyDaysCumulative =[]
	let tenDaysData =[]
	let tenDaysLabel =[]
	
	let tendaysForecastAccumulatedRain =0
	let lengthDailyData =0
	 

	
	//calling the  function from server to retrieve the  daily rainfall
	Meteor.call('daily-rainfall-data',awsID,dateMongo,dateEnteredOriginal, function(err,response){ 
	  	
	   response.label.forEach((item) =>{
	   	    labelDate.push (item)
	   })

	   response.dataDaily.forEach((data) =>{
	   		dailyRainfall.push(data)
	   		tenDaysData.push(0) 
	   })

	   lengthDailyData = dailyRainfall.length

	   
	   
  


	   //retrieving the thirty days cumulative data
		Meteor.call('thirty-rainfall-data',awsID,dateMongo,dailyRainfall.length, function(err,result){

			result.thirtyDaysCumulative.forEach((result) =>{
				thirtyDaysCumulative.push(result)

			})
		 
			//retrieving the twenty days cumulative data
			Meteor.call('twenty-rainfall-data',awsID,dateMongo,dailyRainfall.length, function(err,resultTwenty){

				resultTwenty.twentyDaysCumulative.forEach((twentyData) =>{
					twentyDaysCumulative.push(twentyData)

				})

	
				 
				//retrieving the ten days forecast_ten_days
				Meteor.call('tenDays-rainfall-data',awsID, function(err,resultTen){

				resultTen.tenDataRainfall.forEach((tenData) =>{
					//dailyRainfall.push(tenData)
					if(dateCurrent <= dateEnteredFormatted ){
						tenDaysData.push(tenData)
						dailyRainfall.push(0)
					}
					
					
				}) 

				resultTen.dateLabel.forEach((tenDataLabel) =>{
					if(dateCurrent <= dateEnteredFormatted ){
						labelDate.push(tenDataLabel)
					}
					
					

				})

				//retreiving the total accumulated rainfall for ten days
				tendaysForecastAccumulatedRain = parseFloat(resultTen.totalTenDaysForecast)

				//retrieving the week number from mongo collection
				let weekData = weekNoCollection.findOne({date:dateEnteredFormatted})

				//retrieve the data for the duration yield				
				let  durationYieldData = durationYields.findOne({weekNo:weekData.weekNo,cropType:crops, cropVariety :variety,locationID:locationID})
				
				if ( durationYieldData != null ){



					var comment
					if (durationYieldData.yield > 0) {
						comment = durationYieldData.yield + "% higher than the average."
						komento = durationYieldData.yield + "% mas mataas kaysa pangkaraniwan."

					} else {
						comment = Math.abs(durationYieldData.yield) + "% lower than the average."
						komento =  Math.abs(durationYieldData.yield)+ "% mas mababa kaysa pangkaraniwan."

					}

					//retrieve the threshold
					let thresholdsData = thresholdsCollection.findOne({cropType:crops, cropVariety :variety})
					//check if its days is twenty or thirty
					if(thresholdsData.days == 30) {
						//thirty days cumulative					

						if (thirtyDaysCumulative[lengthDailyData-1]==thresholdsData.rainfall){
							var recommendation = "<p class= 'recommendation'></p>Your location is ready for planting of " + crops + " - " + variety +" (total rainfall for the past 30 days is  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).There is enough soil moisture.The  expected yield is " + comment ;
							var rekomendasyon ="<p class= 'recommendation'></p>Sapat na ang tubig sa lupa sa lokasyong napili para sa " + crops + " - " + variety +" (total sa 30 araw ay  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).Mayroon ng sapat na kahalugmigmigan.Kung magtatanim ngayon, ang inaasahang ani ay " + komento ;
						}

						else {
							var recommendation = "<p class= 'recommendation'></p>Your location is not yet ready for planting of " + crops + " - " + variety +" due to lack of soil moisture (total rainfall for the past 30 days is  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).The  expected yield is " + comment ;
							var rekomendasyon ="<p class= 'recommendation'></p>Hindi pa sapat ang tubig sa lupa sa lokasyong napili para sa " + crops + " - " + variety +" dahil sa kakulangan ng kahalugmigmigan (total sa 30 araw ay  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).Kung magtatanim ngayon, ang inaasahang ani ay " + komento ;
						}


					}else {
						//twenty days cumulative						
						if (twentyDaysCumulative[lengthDailyData-1]==thresholdsData.rainfall){
							var recommendation = "<p class= 'recommendation'></p>Your location is ready for planting of " + crops + " - " + variety +"(total rainfall for the past 20 days is  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).There is enough soil moisture.The  expected yield is " + comment ;
							var rekomendasyon ="<p class= 'recommendation'></p>Sapat na ang tubig sa lupa sa lokasyong napili para sa " + crops + " - " + variety +" (total sa 20 araw ay  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).Mayroon ng sapat na kahalugmigmigan.Kung magtatanim ngayon, ang inaasahang ani ay " + komento ;
						}

						else {
							var recommendation = "<p class= 'recommendation'></p>Your location is not yet ready for planting of " + crops + " - " + variety +" due to lack of soil moisture (total rainfall for the past 20 days is  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).The  expected yield is " + comment ;
							var rekomendasyon ="<p class= 'recommendation'></p>Hindi pa sapat ang tubig sa lupa sa lokasyong napili para sa " + crops + " - " + variety +" dahil sa kakulangan ng kahalugmigmigan (total sa 20 araw ay  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).Kung magtatanim ngayon, ang inaasahang ani ay " + komento ;
						}


					}

					var crop = "<p class= 'cropName'></p>";				
					document.getElementById("crops").insertAdjacentHTML('beforebegin', crop);					
					$('.cropName').text(crops.toUpperCase() +' - ' + variety);
					document.getElementById("crops").insertAdjacentHTML('beforebegin', recommendation);
					document.getElementById("crops").insertAdjacentHTML('beforebegin', rekomendasyon);


				} else {
					var crop = "<p class= 'crops'>No data found for simulation</p>";				
					document.getElementById("crops").insertAdjacentHTML('beforebegin', crop);

				}


				//chartjs
				if(dateCurrent <= dateEnteredFormatted ){					
					//creating the chart
					var barChartData = {

						
			            labels: labelDate,
			            datasets: [{
			                type: 'bar',
			                  label: "Daily Rainfall",
			                    data: dailyRainfall,
			                    fill: false,			                    			                    
			                    backgroundColor:'#660000',			                   
			                    borderColor: '#660000',
			                    hoverBackgroundColor: '#660000',
			                    hoverBorderColor: '#660000',
			                    yAxisID: 'y-axis-1'
			            }, {
			                label: "Twenty Days Cumulative Rainfall",
			                    type:'line',
			                    data: twentyDaysCumulative,
			                    fill: false,
			                    borderColor: '#0000FF',
			                    backgroundColor: '#0000FF',
			                    pointBorderColor: '#0000FF',
			                    pointBackgroundColor: '#0000FF',
			                    pointHoverBackgroundColor: '#0000FF',
			                    pointHoverBorderColor: '#0000FF',
			                    yAxisID: 'y-axis-2'
			            },{
			                label: "Thirty Days Cumulative Rainfall",
			                    type:'line',
			                    data: thirtyDaysCumulative,
			                    fill: false,
			                    borderColor: '#00CC66',
			                    backgroundColor: '#00CC66',
			                    pointBorderColor: '#00CC66',
			                    pointBackgroundColor: '#00CC66',
			                    pointHoverBackgroundColor: '#00CC66',
			                    pointHoverBorderColor: '#00CC66',
			                    yAxisID: 'y-axis-2'
			            }, {
			                type: 'bar',
			                 label: "Ten Days Forecast",
			                    data: tenDaysData,
			                    fill: false,			                    
			                    backgroundColor:'#EC932F',
			                    borderColor: '#EC932F',
			                    hoverBackgroundColor: '#EC932F',
			                    hoverBorderColor: '#EC932F',
			                   yAxisID: 'y-axis-1'
			            }]
			        };
			    }


			    else {

			    	var barChartData = {

						
			            labels: labelDate,
			            datasets: [{
			                type: 'bar',
			                  label: "Daily Rainfall",
			                    data: dailyRainfall,
			                    fill: false,			                    			                    
			                    backgroundColor:'#660000',			                   
			                    borderColor: '#660000',
			                    hoverBackgroundColor: '#660000',
			                    hoverBorderColor: '#660000',
			                    yAxisID: 'y-axis-1'
			            }, {
			                label: "Twenty Days Cumulative Rainfall",
			                    type:'line',
			                    data: twentyDaysCumulative,
			                    fill: false,
			                    borderColor: '#0000FF',
			                    backgroundColor: '#0000FF',
			                    pointBorderColor: '#0000FF',
			                    pointBackgroundColor: '#0000FF',
			                    pointHoverBackgroundColor: '#0000FF',
			                    pointHoverBorderColor: '#0000FF',
			                    yAxisID: 'y-axis-2'
			            },{
			                label: "Thirty Days Cumulative Rainfall",
			                    type:'line',
			                    data: thirtyDaysCumulative,
			                    fill: false,
			                    borderColor: '#00CC66',
			                    backgroundColor: '#00CC66',
			                    pointBorderColor: '#00CC66',
			                    pointBackgroundColor: '#00CC66',
			                    pointHoverBackgroundColor: '#00CC66',
			                    pointHoverBorderColor: '#00CC66',
			                    yAxisID: 'y-axis-2'
			            }]
			        };

			    } 

			        //chartjs
			        var ctx = document.getElementById("canvas").getContext("2d"); 
			            window.myBar = new Chart(ctx, {
			                type: 'bar',
			                data: barChartData,
			                options: {
			                responsive: true,
			                tooltips: {
			                  mode: 'label'
			              },
			              elements: {
			                line: {
			                    fill: false
			                }
			            },
			              scales: {
			                xAxes: [{
			                    display: true,
			                    gridLines: {
			                        display: false
			                    },
			                    labels: {
			                        show: true,
			                    },		                  


			                }],
			                yAxes: [{
			                    type: "linear",
			                    display: true,
			                    position: "left",
			                    id: "y-axis-1",
			                    gridLines:{
			                        display: false
			                    },
			                    labels: {
			                        show:true,
			                        
			                    } ,

			                    scaleLabel: {
        							display: true,
								    labelString: "Amount of Rainfall in millimeter(mm) for Daily and Ten Days Forecast",

								}
								        

								      



			                }, {
			                    type: "linear",
			                    display: true,
			                    position: "right",
			                    id: "y-axis-2",
			                    gridLines:{
			                        display: false
			                    },
			                    labels: {
			                        show:true,
			                        
			                    },

			                    scaleLabel: {
        							display: true,
								    labelString: "Amount of Rainfall in millimeter(mm) for Twenty and Thirty Days Cumulative",

								}



			                } ]
			            }
			            }
			            });          
				
										

						
						})					

						
						})
						
					}) 				  	 
			});
	 

};




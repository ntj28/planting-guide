import { durationYields  } from '../../../lib/collections/duration_yield.js'
import { weekNoCollection  } from '../../../lib/collections/week_no.js'
import { thresholdsCollection  } from '../../../lib/collections/thresholds.js'
import { tenDaysForecast  } from '../../../lib/collections/forecast_ten_days.js'
import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js'
import { Meteor } from 'meteor/meteor'

Template.ChartRainfall.onCreated( () => {

  
});  


Template.ChartRainfall.rendered = () =>{

	var Highcharts = require('highcharts');

	// Load module after Highcharts is loaded
	require('highcharts/modules/exporting')(Highcharts);

	// Create the chart
	Highcharts.chart('container', { /*Highcharts options*/ });

	const awsID = FlowRouter.getParam('awsID')
	const locationID = FlowRouter.getParam('locationID')
	const dateEntered = FlowRouter.getParam('date')	

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




	



	//var cityNoSpace
	//var provinceNoSpace

	

	
	//console.log(dateMongo)

	//daily rainfall
	let labelDate = []
	var dataDailyRainfall = []
	var num =0

	let dailyRainfall = []
	let thirtyDaysCumulative =[]
	let twentyDaysCumulative =[]
	let tenDaysData =[]
	let tenDaysLabel =[]
	//let thirtyDaysAccumulatedRainfall =0
	//let twentyDaysAccumulatedRainfall =0
	let tendaysForecastAccumulatedRain =0
	let lengthDailyData =0
	 

	//dailyRainfall =  Meteor.call('daily-rainfall-data',location_id,dateMongo);
	//labelDate= dailyRainfall.label[]
	//dataDailyRainfall = dailyRainfall.dataDaily

	//console.log ('dates upper' + dailyRainfall.label )


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
			
			
			
			//getting the accumulated rainfall for thirty days 
			//thirtyDaysAccumulatedRainfall = parseFloat(result.thirtyDaysAccumulatedRainfall)//.toFixed(2) 
			//modifying the content of the  p tag
			
			 //console.log("thirty accumulated" + result)
			
		 
			//retrieving the twenty days cumulative data
			Meteor.call('twenty-rainfall-data',awsID,dateMongo,dailyRainfall.length, function(err,resultTwenty){

				resultTwenty.twentyDaysCumulative.forEach((twentyData) =>{
					twentyDaysCumulative.push(twentyData)

				})

				

				// = parseFloat(resultTwenty.twentyDaysAccumulatedRainfall)
				
				
				 
				//retrieving the ten days forecast_ten_days
				Meteor.call('tenDays-rainfall-data',awsID, function(err,resultTen){

				resultTen.tenDataRainfall.forEach((tenData) =>{
					//dailyRainfall.push(tenData)
					if(dateCurrent <= dateEnteredFormatted ){
						tenDaysData.push(tenData)
						dailyRainfall.push(0)
					}
					
					//thirtyDaysCumulative.push(0)
					//twentyDaysCumulative.push(0)

				}) 

				resultTen.dateLabel.forEach((tenDataLabel) =>{
					if(dateCurrent <= dateEnteredFormatted ){
						labelDate.push(tenDataLabel)
					}
					
					//tenDaysLabel.push(tenDataLabel)

				})

				//retreiving the total accumulated rainfall for ten days
				tendaysForecastAccumulatedRain = parseFloat(resultTen.totalTenDaysForecast)

				//retrieving the week number from mongo collection
				//const task = Tasks.findOne({_id})
				
				
				
				let thresholdsData =thresholdsCollection.find({}).fetch()				
				thresholdsData.forEach((item) =>{

					//retrieving the week number from mongo collection
					let weekData = weekNoCollection.findOne({date:dateEnteredFormatted})
					//console.log("week no. is " + weekData.weekNo)

					//retrieve the  yield for each crop in threshold
					let  durationYieldData = durationYields.findOne({weekNo:weekData.weekNo,cropType:item.crop})
					 
					var crop = "<p class= 'crops'></p>";
					
					
					document.getElementById("crops").insertAdjacentHTML('beforebegin', crop);					
					$('.crops').text(item.crop.toUpperCase());
					
					
					if (item.days == 30){
						//thirty days cumulative
						
						if (thirtyDaysCumulative[lengthDailyData-1]==item.rainfall){
							var recommendation = "<p class= 'recommendation'></p>Your location is ready for planting of rainfed rice(total rainfall for the past 30 days is  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).There is enough soil moisture.The  expected yield is " + durationYieldData.yield + " kg/Ha." ;
						}

						else {
							var recommendation = "<p class= 'recommendation'></p>Your location is not yet ready for planting of rainfed rice due to lack of soil moisture (total rainfall for the past 30 days is  "+thirtyDaysCumulative[lengthDailyData-1] + "  mm).The  expected yield is " + durationYieldData.yield + " kg/Ha." ;
						}


					}else {
						//twenty days cumulative
						if (twentyDaysCumulative[lengthDailyData-1]==item.rainfall){
							var recommendation = "<p class= 'recommendation'></p>Your location is ready for planting of rainfed rice(total rainfall for the past 30 days is  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).There is enough soil moisture.The  expected yield is " + durationYieldData.yield + " kg/Ha." ;
						}

						else {
							var recommendation = "<p class= 'recommendation'></p>Your location is not yet ready for planting of rainfed rice due to lack of soil moisture (total rainfall for the past 30 days is  "+twentyDaysCumulative[lengthDailyData-1] + "  mm).The  expected yield is " + durationYieldData.yield + " kg/Ha." ;
						}

					

					}


					document.getElementById("crops").insertAdjacentHTML('beforebegin', recommendation);




					
								

					//console.log("crops" + item.crop)
					
				})

				
				


				//adding a new element using jquery				
				//function addParagraphs() {
			    //var p2 = "<p>paragraph 2</p>";
			    //document.getElementById("p3").insertAdjacentHTML('beforebegin', p2);
			    //}
			    //<p id="p1">paragraph 1</p>
				//<p id="p3">paragraph 3</p>
				//<p id="p4">paragraph 4</p>
				//<input id="b2" type='button' onclick='addParagraphs()' value='Add P2' />
				//


				

				//console.log('sample'+tenDaysData)

				//console.log('thirty days cumulative' + thirtyDaysCumulative)
				//console.log('daily no.' + dailyRainfall)
				//console.log('twenty' + twentyDaysCumulative)

				//setting the color of the  daily rainfall
				//var color =[]
				//for (i=0; i< dailyRainfall.length; i++ ){
				//	color.push('#660000')
				//}

				//console.log(color)

				//sample =  '#660000'
				//console.log("date TOday " + dateCurrent + "date Entered " +dateEnteredFormatted)
				console.log("dates" +labelDate)
				console.log("data daily" +dailyRainfall)
				console.log("data thirty" +thirtyDaysCumulative)
				console.log("data twenty" +twentyDaysCumulative)

				//high charts

				$(function () {
				    Highcharts.chart('container', {
				        chart: {
				            zoomType: 'xy'
				        },
				        title: {
				            text: 'Average Monthly Weather Data for Tokyo'
				        },
				        subtitle: {
				            text: 'Source: WorldClimate.com'
				        },
				        xAxis: [{
				            categories: labelDate,
				            crosshair: true
				        }],
				        yAxis: [{ // Primary yAxis
				            labels: {
				                format: '{value}°C',
				                style: {
				                    color: Highcharts.getOptions().colors[2]
				                }
				            },
				            title: {
				                text: 'Temperature',
				                style: {
				                    color: Highcharts.getOptions().colors[2]
				                }
				            },
				            opposite: true

				        }, { // Secondary yAxis
				            gridLineWidth: 0,
				            title: {
				                text: 'Rainfall',
				                style: {
				                    color: Highcharts.getOptions().colors[0]
				                }
				            },
				            labels: {
				                format: '{value} mm',
				                style: {
				                    color: Highcharts.getOptions().colors[0]
				                }
				            }

				        }, { // Tertiary yAxis
				            gridLineWidth: 0,
				            title: {
				                text: 'Sea-Level Pressure',
				                style: {
				                    color: Highcharts.getOptions().colors[1]
				                }
				            },
				            labels: {
				                format: '{value} mb',
				                style: {
				                    color: Highcharts.getOptions().colors[1]
				                }
				            },
				            opposite: true
				        }],
				        tooltip: {
				            shared: true
				        },
				        legend: {
				            layout: 'vertical',
				            align: 'left',
				            x: 80,
				            verticalAlign: 'top',
				            y: 55,
				            floating: true,
				            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				        },
				        series: [{
				            name: 'Rainfall',
				            type: 'column',
				            yAxis: 1,
				            data: dailyRainfall,
				            tooltip: {
				                valueSuffix: ' mm'
				            }

				        }, {
				            name: 'Sea-Level Pressure',
				            type: 'spline',
				            yAxis: 2,
				            data:  thirtyDaysCumulative,
				            marker: {
				                enabled: false
				            },
				            dashStyle: 'shortdot',
				            tooltip: {
				                valueSuffix: ' mb'
				            }

				        }, {
				            name: 'Temperature',
				            type: 'spline',
				            data: twentyDaysCumulative,
				            tooltip: {
				                valueSuffix: ' °C'
				            }
				        }]
				    });
				});


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

			        //updating the  datasets for ten days forecast
			        //let numberDataDaily = dailyRainfall.length
			        //let numberTenForecast = tenDaysData.length

			        //for(var i=0;i<numberTenForecast;i++){

			        //	barChartData.datasets[0].data[numberDataDaily] = tenDaysData[i];
  					//	barChartData.labels[numberDataDaily] = tenDaysLabel[i];
  					//	color.push('#EC932F')


  						//color.push('#0000FF')

  						//barChartData.datasets[0].backgroundColor.push('#660000')
  						//barChartData.datasets[0].borderColor = '#0000FF'
			            //barChartData.datasets[0].hoverBackgroundColor = '#0000FF'
			            //barChartData.datasets[0].hoverBorderColor = '#0000FF'
			            
  					//	numberDataDaily = numberDataDaily + 1

			        //}




			        //myBar.datasets[0].bars[0].fillColor

			        //console.log(barChartData)
			        

			        //barChartData.datasets[0].data[27] = 11;
  					//barChartData.labels[27] = "Newly Added";
  					//window.myBar.update();

  					//cahrtjs

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

			                    //scaleLabel: {
        						//	display: true,
								//    labelString: "Date",

								//}


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

			            //myBar.datasets[0].bars[0].backgroundColor = "rgb(239,98,69)"

			           // console.log(myBar)
			            //console.log(myBar.datasets[0].backgroundColor)
				
										

						
						})
						

						
						})


						
					}) 

	



				  	 
			});


				 
	 

	//thirty days cumulative
	

	


	//twenty days cumulative
	

	
	//ten days forecast 
	

	 




	//creates the graph
	
	
	//var ctx = document.getElementById("c").getContext("2d");
	//    var data = {
	//      labels: label,
	//      datasets: [{
	//        label: "My First dataset",
	        //new option, type will default to bar as that what is used to create the scale
    //    	type: "bar",
	//      fillColor: "rgba(220,220,220,0.2)",
	//        strokeColor: "rgba(220,220,220,1)",
	//        pointColor: "rgba(220,220,220,1)",
	//        pointStrokeColor: "#fff",
	//        pointHighlightFill: "#fff",
	//        pointHighlightStroke: "rgba(220,220,220,1)",
	//        data: dataDaily
	//        }, {
	//        label: "My Second dataset",
	        //new option, type will default to bar as that what is used to create the scale
    //    	type: "line",
	//        fillColor: "rgba(151,187,205,0.2)",
	//      strokeColor: "rgba(151,187,205,1)",
	//		pointColor: "rgba(151,187,205,1)",
	//        pointStrokeColor: "#fff",
	///        pointHighlightFill: "#fff",
	//        pointHighlightStroke: "rgba(151,187,205,1)",
	//		data: thirtyDaysCumulative
	//      }]
	//    };
	//    var MyNewChart = new Chart(ctx).LineBar(data);

};



//setInterval(Meteor.call('sample'),1000)
//console.log("hello" + sample[0])
Template.ChartRainfall.helpers ({



	sample1: function(){

		const awsID = FlowRouter.getParam('awsID')
		let dateCurrent = new Date()
		dateCurrent.setDate(dateCurrent.getDate() -30)
		let dateMongo  = dateCurrent.toISOString().slice(0,10).replace(/-/g,"-");
		var thirtyDaysAccumulatedRainfall = []

		Meteor.call('thirty-rainfall-data',awsID,dateMongo, function(err,result){

			//getting the accumulated rainfall for thirty days 
			thirtyDaysAccumulatedRainfall.push(parseFloat(result.thirtyDaysAccumulatedRainfall))
		})

		Meteor.call('twenty-rainfall-data',awsID,dateMongo, function(err,resultTwenty){

			//getting the twenty days accumulated rainfall
			twentyDaysAccumulatedRainfall = parseFloat(resultTwenty.twentyDaysAccumulatedRainfall)
			console.log("20 :" +twentyDaysAccumulatedRainfall)
		})

		const cityField = $('#city') 

		console.log (thirtyDaysAccumulatedRainfall)

		


		sample1 = "nelson h .tejara"
		return sample1

	}






})
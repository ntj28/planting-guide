import { durationYields  } from '../../../lib/collections/duration_yield.js'
import { tenDaysForecast  } from '../../../lib/collections/forecast_ten_days.js'
import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js'
import { Meteor } from 'meteor/meteor'




Template. DailyRainfall.rendered = () =>{

	

	const awsID = FlowRouter.getParam('awsID')
	var date = new Date()
	var cityNoSpace
	var provinceNoSpace

	

	//get the current date and subtract it with 30 days to present the  chart
	let dateCurrent = new Date()
	dateCurrent.setDate(dateCurrent.getDate() -30)
	let dateMongo  = dateCurrent.toISOString().slice(0,10).replace(/-/g,"-");
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
	let thirtyDaysAccumulatedRainfall =0
	let twentyDaysAccumulatedRainfall =0
	let tendaysForecastAccumulatedRain =0
	 

	//dailyRainfall =  Meteor.call('daily-rainfall-data',location_id,dateMongo);
	//labelDate= dailyRainfall.label[]
	//dataDailyRainfall = dailyRainfall.dataDaily

	//console.log ('dates upper' + dailyRainfall.label )


	//calling the  function from server to retrieve the  daily rainfall
	Meteor.call('daily-rainfall-data',awsID,dateMongo, function(err,response){ 
	  	
	   response.label.forEach((item) =>{
	   	    labelDate.push (item)
	   })

	   response.dataDaily.forEach((data) =>{
	   		dailyRainfall.push(data)
	   		tenDaysData.push(0) 
	   })

	   console.log("data daily" +dailyRainfall)

	   //retrieving the thirty days cumulative data
		Meteor.call('thirty-rainfall-data',awsID,dateMongo, function(err,result){

			result.thirtyDaysCumulative.forEach((result) =>{
				thirtyDaysCumulative.push(result)

			})
			
			console.log("data thirty" +thirtyDaysCumulative)

			//getting the accumulated rainfall for thirty days 
			thirtyDaysAccumulatedRainfall = parseFloat(result.thirtyDaysAccumulatedRainfall)
			//modifying the content of the  p tag
			
			 //console.log("thirty accumulated" + result)
			$('#rice-english').text( "Total Accumulated Rainfall for 30 days " + thirtyDaysAccumulatedRainfall.toFixed(2)  );
			
		 
			//retrieving the twenty days cumulative data
			Meteor.call('twenty-rainfall-data',awsID,dateMongo, function(err,resultTwenty){

				resultTwenty.twentyDaysCumulative.forEach((twentyData) =>{
					twentyDaysCumulative.push(twentyData)

				})

				console.log("data twenty" +twentyDaysCumulative)
				twentyDaysAccumulatedRainfall = parseFloat(resultTwenty.twentyDaysAccumulatedRainfall)
				$('#corn-english').text( "Total Accumulated Rainfall for 20 days " + twentyDaysAccumulatedRainfall.toFixed(2)  );

				
				 
				//retrieving the ten days forecast_ten_days
				Meteor.call('tenDays-rainfall-data',awsID, function(err,resultTen){

				resultTen.tenDataRainfall.forEach((tenData) =>{
					//dailyRainfall.push(tenData)
					tenDaysData.push(tenData)
					dailyRainfall.push(0)
					//thirtyDaysCumulative.push(0)
					//twentyDaysCumulative.push(0)

				}) 

				resultTen.dateLabel.forEach((tenDataLabel) =>{
					labelDate.push(tenDataLabel)
					//tenDaysLabel.push(tenDataLabel)

				})

				//retreiving the total accumulated rainfall for ten days
				tendaysForecastAccumulatedRain = parseFloat(resultTen.totalTenDaysForecast)


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

			        console.log(barChartData)
			        

			        //barChartData.datasets[0].data[27] = 11;
  					//barChartData.labels[27] = "Newly Added";
  					//window.myBar.update();

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
			                    }
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
Template.DailyRainfall.helpers ({



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
import { durationYields  } from '../../../lib/collections/duration_yield.js'
import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js'
import { Meteor } from 'meteor/meteor'

Template. DailyRainfall.rendered = () =>{


	 

	const location_id = FlowRouter.getParam('location_id')
	var date = new Date()
	var cityNoSpace
	var provinceNoSpace

	

	 
	//get the current date and subtract it with 30 days to present the  chart
	let dateCurrent = new Date()
	dateCurrent.setDate(dateCurrent.getDate() -30)
	let dateMongo  = dateCurrent.toISOString().slice(0,10).replace(/-/g,"-");
	//console.log(dateMongo)

	//daily rainfall
	var label = []
	var dataDaily = []
	let amountRain  = amountRainfallCollection.find({$and:[{location_id:location_id},{date:{$gte:dateMongo}}]})//.sort( { '$date': 1 })//.fetch()
	amountRain.forEach((item)=>{
		//const date = `${item.date}`
		label.push(`${item.date}`)
		dataDaily.push(`${item.amount_rainfall}`)
		//const city = `${item.city}`
		//cityNoSpace =city.replace(" ","_")
		//console.log(provinceNoSpace + " city" + cityNoSpace)
	})

	//thirty days cumulative
	let thirtyDaysCumulative =[]
	let dateSixtyDays = new Date()
	dateSixtyDays.setDate(dateSixtyDays.getDate() - 60)
	let dateMongoSixty  = dateSixtyDays.toISOString().slice(0,10).replace(/-/g,"-");

	let startSixty = new Date(dateMongoSixty)
	let startThirty = new Date (dateMongo)
	let totalSixty = 0
	for (i =0 ; i<30 ; i++){

		 startSixty.setDate(startSixty.getDate() - 1);
		 startThirty.setDate(startThirty.getDate() + 1);

		 let startSixtyMongo =startSixty.toISOString().slice(0,10).replace(/-/g,"-");
		 let startThirtyMongo =startThirty.toISOString().slice(0,10).replace(/-/g,"-");
		 //label.push(startThirtyMongo)

		 //console.log ('sixty days' +startSixtyMongo)
		 //console.log ('thirty days' +startThirtyMongo)

		 let amountRainSixty  = amountRainfallCollection.find({
		 	$and:[{
		 		location_id:location_id
		 	},{
		 		date:{$gte:startSixtyMongo,$lte:startThirtyMongo}}]})//.sort( { '$date': 1 })//.fetch()
		 
		 amountRainSixty.forEach((item)=>{
		 //const date = `${item.date}`
		 var data = `${item.amount_rainfall}`
		 //console.log(data)
		 totalSixty = totalSixty + parseFloat(data) 
 		 
		 //const city = `${item.city}`
		 //cityNoSpace =city.replace(" ","_")
		 //console.log(provinceNoSpace + " city" + cityNoSpace)
		})
		totalSixty = totalSixty.toFixed(2);
		thirtyDaysCumulative.push(totalSixty)
		//console.log(totalSixty)
		totalSixty = 0
	
	}

	


	//twenty days cumulative
	let twentyDaysCumulative =[]
	let dateCurrentTwenty = new Date()
	let dateCurrentForty = new Date()
	dateCurrentForty.setDate(dateCurrentTwenty.getDate() -40)
	let dateMongoForty  = dateCurrentForty.toISOString().slice(0,10).replace(/-/g,"-");
	dateCurrent = new Date()
	dateCurrent.setDate(dateCurrent.getDate() -30)
	let dateThirty = dateCurrent.toISOString().slice(0,10).replace(/-/g,"-");

	let startForty = new Date(dateMongoForty)
	let startThirtyTwenty = new Date (dateThirty)
	let totalTwenty = 0

	for (i =0 ; i<30 ; i++){

		 startForty.setDate(startForty.getDate() - 1);
		 startThirtyTwenty.setDate(startThirtyTwenty.getDate() + 1);

		 let startFortyMongo =startForty.toISOString().slice(0,10).replace(/-/g,"-");
		 let startThirtyTwentyMongo =startThirtyTwenty.toISOString().slice(0,10).replace(/-/g,"-");
		 //label.push(startThirtyMongo)

		 //console.log ('sixty days' +startSixtyMongo)
		 //console.log ('thirty days' +startThirtyMongo)

		 let amountRainTwenty  = amountRainfallCollection.find({$and:[{location_id:location_id},{date:{$gte:startFortyMongo,$lte:startThirtyTwentyMongo}}]})//.sort( { '$date': 1 })//.fetch()
		 
		 amountRainTwenty.forEach((item)=>{
		 //const date = `${item.date}`
		 var data = `${item.amount_rainfall}`
		 //console.log(data)
		 totalTwenty = totalTwenty + Number(data) 
 		 
		 //const city = `${item.city}`
		 //cityNoSpace =city.replace(" ","_")
		 //console.log(provinceNoSpace + " city" + cityNoSpace)
		})
		totalTwenty = totalTwenty.toFixed(2);
		twentyDaysCumulative.push(totalTwenty)
		//console.log(totalSixty)
		totalTwenty = 0
	
	}

	console.log('thirty days ' + thirtyDaysCumulative)
	console.log('daily' + dataDaily)
	console.log('twenty days ' + twentyDaysCumulative)


	//creates the graph
	var barChartData = {
            labels: label,
            datasets: [{
                type: 'bar',
                  label: "Daily Rainfall",
                    data: dataDaily,
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
            }, {
                label: "Thirty Days Cumulative Rainfall",
                    type:'line',
                    data: thirtyDaysCumulative,
                    fill: false,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    yAxisID: 'y-axis-2'
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
            } ]
        };
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
                }]
            }
            }
            });
	
	
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

Template.DailyRainfall.helpers ({



})
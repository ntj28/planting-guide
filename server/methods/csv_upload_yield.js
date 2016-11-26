import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

Meteor.methods({


	'parseUploadYield' : function(data,locationID,cropType){

		//console.log(data)
	     

	     
	    let week =[]
		let rainfallArray =[]

		//console.log("length " + data.length)


	    for ( let i = 0; i < data.length; i++ ) {

	    	

	    	if (data[i].length == 52) {

	    		//console.log(data[i])
	    		weekNo = 1
	    		data[i].forEach((yieldData) => {
	    			Meteor.call('update-duration-yield',locationID,cropType,weekNo,yieldData)
	    			weekNo ++
	    		})
	    		//let date  = new Date(data[i][0])
				//let dateFormatted =date.toISOString().slice(0,10).replace(/-/g,"-");		    	 
		    	//Meteor.call('update-rainfall-data',awsID,dateFormatted,data[i][19])
			     
			}    	
			
	    }
	  }



})

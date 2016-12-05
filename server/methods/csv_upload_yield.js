import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

Meteor.methods({


	'parseUploadYield' : function(data,locationID,cropType,cropVariety){

 	     
	    let week =[]
		let rainfallArray =[]

	 


	    for ( let i = 0; i < data.length; i++ ) {

	    	

	    	if (data[i].length == 52) {

	    		 
	    		weekNo = 1
	    		data[i].forEach((yieldData) => {
	    			Meteor.call('update-duration-yield',locationID,cropType,cropVariety,weekNo,yieldData)
	    			weekNo ++
	    		})
	    		 
			}    	
			
	    }
	  }



})

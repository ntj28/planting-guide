import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

Meteor.methods({


	'parseUpload' : function(data,awsID){
	     

	     
	    let dateArray =[]
		let rainfallArray =[]

	    for ( let i = 1; i < data.length; i++ ) {

	    	if (data[i][0]!= null) {
	    		let date  = new Date(data[i][0])
				let dateFormatted =date.toISOString().slice(0,10).replace(/-/g,"-");		    	 
		    	Meteor.call('update-rainfall-data',awsID,dateFormatted,data[i][19])
			     
			}    	
			
	    }
	  }



})

 





 